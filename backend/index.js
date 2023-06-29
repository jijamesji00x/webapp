const express = require("express");
const { Pool } = require("pg");

const app = express();

// PostgreSQL configuration
require("dotenv").config({ path: "../.env" });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }
});

// Define your API routes
app.get("/api/data", (req, res) => {
  // Query the database and return the data as JSON
  pool.query("SELECT * FROM country_and_capitals", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Error executing query" });
    } else {
      res.json(result.rows);
    }
  });
});

const port = 3000; // or any other port you prefer

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
