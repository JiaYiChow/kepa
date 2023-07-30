const path = require("path");
process.env.DOTENV_CONFIG_PATH = path.resolve(__dirname, ".env");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const controller = require("./controller");
const pool = require("./db/db");

const shutdown = () => {
  pool.end(() => {
    console.log("Database connection pool closed");
    process.exit(0);
  });
};

// Handle termination events
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

//set up cors
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.listen(8080);

app.get("/api/records/user/:userId", controller.getAllRecordsByUserId);
app.post("/api/records", controller.createNewRecord); //should see how paypal create card also
app.delete("/api/records/:recordId", controller.deleteRecord);
