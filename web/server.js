const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = 5000;

// PostgreSQL Connection Pool
const pool = new Pool({
  user: "yogesh",
  host: "db",
  database: "docker",
  password: "yogesh1090@",
  port: 5432,
});

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    // Fetch formatted current date & time
    const result = await pool.query("SELECT TO_CHAR(NOW(), 'YYYY-MM-DD HH24:MI:SS') AS formatted_time");

    const time = result.rows[0].formatted_time;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome Page</title>
          <link rel="stylesheet" href="/style.css">
      </head>
      <body>
          <div class="container">
              <h1>Hello, Yogesh & 2022BCD0052!</h1>
                <p>Welcome to the PostgreSQL & Docker Compose Demo.</p>
                <p>This is a simple web application that connects to a PostgreSQL database.</p>
                <p>It displays the current date and time from the database.</p>
                <hr>
                
              <p>Current PostgreSQL Time: <strong>${time}</strong></p>
          </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Database connection failed. Error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
