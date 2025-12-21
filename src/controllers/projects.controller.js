const pool = require("../config/db");

// CREATE project
exports.createProject = async (req, res) => {
  const {
    title,
    description,
    tech_stack,
    github_url,
    live_url,
    media_id
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO projects 
      (title, description, tech_stack, github_url, live_url, media_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [title, description, tech_stack, github_url, live_url, media_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all projects (public)
exports.getProjects = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        projects.*,
        json_build_object(
          'id', media.id,
          'file_url', media.file_url
        ) AS media
      FROM projects
      LEFT JOIN media ON projects.media_id = media.id
      ORDER BY projects.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    tech_stack,
    github_url,
    live_url,
    media_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE projects SET
        title=$1,
        description=$2,
        tech_stack=$3,
        github_url=$4,
        live_url=$5,
        media_id=$6
      WHERE id=$7
      RETURNING *`,
      [title, description, tech_stack, github_url, live_url, media_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM projects WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
