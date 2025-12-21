const supabase = require("../config/supabase");
const pool = require("../config/db");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileName = `projects/${Date.now()}-${req.file.originalname}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);

    const result = await pool.query(
      `INSERT INTO media (file_name, file_url, bucket, content_type)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [
        fileName,
        data.publicUrl,
        "project-images",
        req.file.mimetype
      ]
    );

    res.status(201).json({
      message: "Image uploaded",
      media: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
