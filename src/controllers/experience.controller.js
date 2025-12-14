const pool = require("../config/db");

// GET all experience (public)
exports.getExperience = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM experience ORDER BY start_date DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE experience (admin)
exports.createExperience = async (req, res) => {
  const { title, company, location, start_date, end_date, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO experience
      (title, company, location, start_date, end_date, description)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [title, company, location, start_date, end_date, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE experience (admin)
exports.updateExperience = async (req, res) => {
  const { title, company, location, start_date, end_date, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE experience
       SET title=$1, company=$2, location=$3,
           start_date=$4, end_date=$5, description=$6
       WHERE id=$7 RETURNING *`,
      [title, company, location, start_date, end_date, description, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE experience (admin)
exports.deleteExperience = async (req, res) => {
  try {
    await pool.query("DELETE FROM experience WHERE id=$1", [req.params.id]);
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
