const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false},
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ DB connection error:", err);
  } else {
    console.log("✅ DB connected at:", res.rows[0]);
  }
});

module.exports = pool;