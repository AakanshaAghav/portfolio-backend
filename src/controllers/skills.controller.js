const pool = require("../config/db");

// CREATE skill
exports.createSkill = async (req, res) => {
  const { name, level } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO skills (name, level) VALUES ($1, $2) RETURNING *",
      [name, level]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all skills
exports.getSkills = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM skills ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE skill
exports.updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, level } = req.body;

  try {
    const result = await pool.query(
      "UPDATE skills SET name=$1, level=$2 WHERE id=$3 RETURNING *",
      [name, level, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE skill
exports.deleteSkill = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM skills WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
