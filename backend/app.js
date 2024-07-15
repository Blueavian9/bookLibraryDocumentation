const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("../routes/auth.routes");
const bookRoutes = require("../routes/book.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/books", bookRoutes);

// Sync the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
