require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../config/db");

(async () => {
  const email = "admin@example.com";
  const password = "Admin@123"; // you can change later

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, hash]
  );

  console.log("✅ Admin user created");
  process.exit();
})();
