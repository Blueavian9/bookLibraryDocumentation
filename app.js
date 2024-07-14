const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

// Middleware:
app.use(cors());
app.use(express.json());

// Sync the database:
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes

// ....

const Port = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}.");
});
