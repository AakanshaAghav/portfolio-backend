const pool = require("../config/db");

/* GET contact (public) */
exports.getContact = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contacts ORDER BY id DESC LIMIT 1"
        );
        res.json(result.rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* CREATE or UPDATE contact (admin) */
exports.upsertContact = async (req, res) => {
    const { email, linkedin_url, github_url } = req.body;

    try {
        const existing = await pool.query("SELECT * FROM contacts LIMIT 1");

        if (existing.rows.length > 0) {
            const result = await pool.query(
                `UPDATE contacts
         SET email=$1, linkedin_url=$2, github_url=$3, updated_at=NOW()
         WHERE id=$4
         RETURNING *`,
                [email, linkedin_url, github_url, existing.rows[0].id]
            );

            return res.json(result.rows[0]);
        }

        const result = await pool.query(
            `INSERT INTO contacts (email, linkedin_url, github_url)
       VALUES ($1,$2,$3)
       RETURNING *`,
            [email, linkedin_url, github_url]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
