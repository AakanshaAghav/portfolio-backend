const pool = require("../config/db");

// GET about (public)
exports.getAbout = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM about LIMIT 1");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE about (admin)
exports.updateAbout = async (req, res) => {
  const { content } = req.body;

  try {
    const result = await pool.query(
      "UPDATE about SET content=$1, updated_at=NOW() RETURNING *",
      [content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
