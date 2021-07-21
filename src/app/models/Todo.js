'use strict';
const { Model, DataTypes } = require('sequelize');
const { db } = require("../concerns/database");

class Todo extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};
Todo.init({
  user_id: DataTypes.INTEGER,
  todolabel: DataTypes.STRING
}, {
  sequelize: db,
  modelName: 'Todo',
  tableName: 'Todos'
});

module.exports = Todo;