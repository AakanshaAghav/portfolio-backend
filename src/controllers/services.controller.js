const pool = require("../config/db");

// GET all services (public)
exports.getServices = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM services ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE service (admin)
exports.createService = async (req, res) => {
    const { title, description, icon } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO services (title, description, icon)
       VALUES ($1,$2,$3)
       RETURNING *`,
            [title, description, icon]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE service (admin)
exports.updateService = async (req, res) => {
    const { title, description, icon } = req.body;

    try {
        const result = await pool.query(
            `UPDATE services
       SET title=$1, description=$2, icon=$3
       WHERE id=$4 RETURNING *`,
            [title, description, icon, req.params.id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE service (admin)
exports.deleteService = async (req, res) => {
    try {
        await pool.query("DELETE FROM services WHERE id=$1", [req.params.id]);
        res.json({ message: "Service deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
