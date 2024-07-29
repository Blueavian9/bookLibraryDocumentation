const app = require("./app");
const config = require("./config/server.config");

const PORT = config.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
