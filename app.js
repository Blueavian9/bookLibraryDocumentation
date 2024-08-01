const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

// Use the routes
app.use("/auth", auth);
app.use("/books", book);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ message: "Invalid token" });
  }
  res.status(500).send("Something broke!");
});

// CORS configuration
app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the bookstore application." });
});

// Register routes
const auth = require("./routes/auth.routes.js");
const book = require("./routes/book.routes.js");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ message: "Invalid token" });
  }
  res.status(500).send("Something broke!");
});

// Database synchronization

if (process.env.NODE_ENV !== "test") {
  db.sequelize
    .sync()
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
}

module.exports = app;
