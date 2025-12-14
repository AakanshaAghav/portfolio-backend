const pool = require("../config/db");

// GET all blogs (public)
exports.getBlogs = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single blog by slug (public)
exports.getBlogBySlug = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM blogs WHERE slug=$1",
      [req.params.slug]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE blog (admin)
exports.createBlog = async (req, res) => {
  const { title, slug, content, image_url } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO blogs (title, slug, content, image_url)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, slug, content, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE blog (admin)
exports.updateBlog = async (req, res) => {
  const { title, slug, content, image_url } = req.body;

  try {
    const result = await pool.query(
      `UPDATE blogs
       SET title=$1, slug=$2, content=$3, image_url=$4
       WHERE id=$5 RETURNING *`,
      [title, slug, content, image_url, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE blog (admin)
exports.deleteBlog = async (req, res) => {
  try {
    await pool.query("DELETE FROM blogs WHERE id=$1", [req.params.id]);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
