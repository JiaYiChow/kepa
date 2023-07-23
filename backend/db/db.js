const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

pool.connect().then(() => console.log("DB connected"));
module.exports = pool;
