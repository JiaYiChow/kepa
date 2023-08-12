const path = require("path");
process.env.DOTENV_CONFIG_PATH = path.resolve(__dirname, ".env");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.listen(8080);

app.get("/api/records/user/:userId", controller.getAllRecordsByUserId);
app.post(
  "/api/records",
  upload.single("audioFile"),
  controller.createNewRecord
);
app.delete("/api/records/:recordId", controller.deleteRecord);
