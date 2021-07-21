const { Op } = require("sequelize");
const Todo = require("../models/Todo");

class TodoService {
  async create({
    user_id,
    todolabel,
  }) {
    const todo = await Todo.create({
      user_id,
      todolabel,
    });
    return todo;
  }
  async findById(id) {
    return Todo.findByPk(id);
  }
  async find({ filterByName } = { filterByName: undefined }) {
    const filters = {
      ...(filterByName && {
        todolabel: {
          [Op.like]: `%${escape(filterByName)}%`,
        },
      }),
    };
    return Todo.findAll({
      where: Object.keys(filters).length > 0 ? filters : undefined,
    });
  }
  async update(instance) {
    await instance.save();
  }
  async deleteById(id) {
    await Todo.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = TodoService;
