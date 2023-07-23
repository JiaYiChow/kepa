const fs = require("fs");
const { Client } = require("pg");

require("dotenv").config();

const seedQuery = fs.readFileSync("seed.pgsql", { encoding: "utf-8" });

// Replace the connection parameters with your PostgreSQL database credentials
const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

client.connect();
client
  .query(seedQuery)
  .then(() => console.log("Table created successfully"))
  .catch((err) => console.error("Error creating tables"))
  .finally(() => client.end());
