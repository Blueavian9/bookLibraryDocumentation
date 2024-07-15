const Sequelize = require("../models/index.js");
const dbConfig = require("../config/db.config");
const userModel = require("../models/user.models.js");
const bookModel = require("../models/book.models.js");

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
});

const db = {
  Sequelize,
  sequelize,
  User: userModel(sequelize, Sequelize.DataTypes),
  Book: bookModel(sequelize, Sequelize.DataTypes),
};

module.exports = db;
