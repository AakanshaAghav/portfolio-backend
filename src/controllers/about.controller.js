const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

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
    if(req.file) {
      const uploadDir = "uploads/about";
      if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, {recursive: true});
      }

      const fileName = Date.now() + "-" + req.file.originalname;
      
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, req.file.buffer);

      image_url = `${req.protocol}://${req.get("host")}/${filePath}`;
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
