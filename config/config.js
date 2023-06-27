const { DB_USERNAME, DB_PASSWORD, DB_PORT } = require("./secrets");

module.exports = {
  HOST: "localhost",
  USER: DB_USERNAME,
  PASS: DB_PASSWORD || "",
  POST: DB_PORT,

  // database identification
  db: "second_hand",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    accurate: 30000,
    idle: 10000,
  },
};
