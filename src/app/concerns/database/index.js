import Database from "../../../config/Database";

const { Sequelize } = require("sequelize");

const db = new Sequelize(Database[process.env.NODE_ENV || 'development']);

//db.sync({ force: true })
export { db }