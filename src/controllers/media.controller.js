const pool = require("../config/db");
const supabase = require("../config/supabase");

// GET all media
exports.getMedia = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM media ORDER BY created_at DESC"
  );
  res.json(result.rows);
};

// DELETE media (DB + Cloud)
exports.deleteMedia = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM media WHERE id=$1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Media not found" });
  }

  const media = result.rows[0];

  // delete from supabase storage
  await supabase.storage
    .from(media.bucket)
    .remove([media.file_name]);

  // delete from DB
  await pool.query("DELETE FROM media WHERE id=$1", [id]);

  res.json({ message: "Media deleted successfully" });
};
