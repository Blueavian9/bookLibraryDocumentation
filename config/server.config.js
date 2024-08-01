// config/server.config.js
module.exports = {
  PORT: process.env.PORT || 8080, // Uses the PORT environment variable if available; otherwise, defaults to 8080.
  secret: process.env.SECRET_ACCESS_KEY,
};
