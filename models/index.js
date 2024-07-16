const { Sequelize } = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
// db.users = require('./user.model.js')(sequelize, Sequelize);
// db.books = require('./book.model.js')(sequelize, Sequelize);

module.exports = db;
