const express = require("express");
const cors = require("cors");
const book = require("./routes/book.routes");
const auth = require("./routes/auth.routes");
const app = express();

// CORS configuration
app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlcoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the bookstore application." });
});

// Register routes
const book = require("./routes/book.routes");
const auth = require("./routes/auth.routes");

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Database synchronization
const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.meesage);
  });

//
app.use((err, req, next) => {
  console.error(err.stack);
  res.status(500).sent("Something broke!");
});


// ... other imports and setup
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: "Invalid token" });
  }
});

// ... rest of your app.js code
