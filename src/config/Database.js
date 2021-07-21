const fs = require("fs");
require("dotenv/config");
module.exports = {
  development: {
    username: process.env.SEQUELIZE_USERNAME || "root",
    password: process.env.SEQUELIZE_PASSWORD || "my-secret-pw",
    database: process.env.SEQUELIZE_DATABASE || "test",
    host: process.env.SEQUELIZE_HOST || "localhost",
    port: process.env.SEQUELIZE_PORT || 3306,
    dialect: process.env.SEQUELIZE_DIALECT || "mysql",
  },
  test: {
    database: "test-database",
    dialect: "sqlite",
    logging: false,
  },
  production: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
  },
};
