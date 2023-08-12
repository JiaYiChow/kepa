require("dotenv").config();
const fs = require("fs");
const { Client } = require("pg");

const seedQuery = fs.readFileSync("./db/seed.pgsql", { encoding: "utf-8" });

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
  .catch((err) => console.error("Error creating tables" + err))
  .finally(() => client.end());
