const pool = require("../config/db");
const supabase = require("../config/supabase");

// GET about (public)
exports.getAbout = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, content, image_url, resume_url, updated_at FROM about LIMIT 1"
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE about (admin)
exports.updateAbout = async (req, res) => {
  const { content, resume_url } = req.body;
  let image_url = null;

  try {
    if (req.file) {
      const file = req.file;

      const fileName = `about/${Date.now()}-${file.originalname}`;

      const { error: uploadError } = await supabase.storage
        .from("about-images") 
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (uploadError) {
        return res.status(400).json({ error: uploadError.message });
      }

      // 🔗 Get public URL
      const { data } = supabase.storage
        .from("about-images") 
        .getPublicUrl(fileName);

      image_url = data.publicUrl;
    }

    const result = await pool.query(
      `UPDATE about
       SET content=$1,
           image_url=COALESCE($2, image_url),
           resume_url=$3,
           updated_at=NOW()
       RETURNING *`,
      [content, image_url, resume_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
