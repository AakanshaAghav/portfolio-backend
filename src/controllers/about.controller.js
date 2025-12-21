const pool = require("../config/db");

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
  const { content, image_url, resume_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE about
       SET content=$1,
           image_url=$2,
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
