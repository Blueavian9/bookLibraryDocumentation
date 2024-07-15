const Sequelize = require("sequelize");
const dbConfig = require("../controllers/config/db.config");

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
});

const User = require("./user.model")(sequelize, Sequelize.DataTypes);
const Book = require("./book.model")(sequelize, Sequelize.DataTypes);

const db = {
  Sequelize,
  sequelize,
  User,
  Book,
};

module.exports = db;
