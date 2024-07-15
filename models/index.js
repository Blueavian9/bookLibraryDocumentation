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

db.User = require("./user.model")(sequelize, Sequilze.DataTypes);
db.Book = require("./bood.model")(sequelize, Sequelize.DataTypes);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // User model definition
  });
  return User;
};
