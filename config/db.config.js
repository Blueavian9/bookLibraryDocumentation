module.exports = {
  dialect: "sqlite", // Specifies SQLite as the database dialect.
  storage: "./database.sqlite", // The file paht where the SQLite database will be stored
  pool: {
    max: 5, // Maximum number of connections in the pool.
    min: 0, // Minimum number of connections in the  pool.
    acquire: 30000, // Maximum time (in milliseconds) that pool will try to get a connection before throwing an error.
    idle: 10000, // Maximum time (in milliseconds) that a connection can be idle before being released.
  },
};
