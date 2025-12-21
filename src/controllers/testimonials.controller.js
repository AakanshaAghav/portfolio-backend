const pool = require("../config/db");

// GET all testimonials (public)
exports.getTestimonials = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM testimonials ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE testimonial (admin)
exports.createTestimonial = async (req, res) => {
  const { name, role, company, message, image_url } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO testimonials (name, role, company, message, image_url)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [name, role, company, message, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE testimonial (admin)
exports.updateTestimonial = async (req, res) => {
  const { name, role, company, message, image_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE testimonials
       SET name=$1, role=$2, company=$3, message=$4, image_url=$5
       WHERE id=$6 RETURNING *`,
      [name, role, company, message, image_url, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE testimonial (admin)
exports.deleteTestimonial = async (req, res) => {
  try {
    await pool.query("DELETE FROM testimonials WHERE id=$1", [req.params.id]);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
