const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");
const User = require("./user.model");
const Book = require("./book.model");
const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
});

const db = {
  Sequelize,
  sequelize,
  User,
  Book,
};

module.exports = db;
