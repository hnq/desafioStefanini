import { route, Method, BaseController } from "@system/controllers";
import StandardSerializer from "../../serializers/StandardSerializer";
import TodoService from "../../services/TodoService";

export default class V1TodoController extends BaseController {
  todoService = new TodoService();

  @route("/", Method.GET)
  async list() {
    const query = this.ctx.request.query;
    const { todolabel } = query;
    const todos = await this.todoService.find({
      filterByName: todolabel,
    });

    this.renderWith(
      {
        standard: "list",
        result: todos,
      },
      {
        serializer: StandardSerializer,
      }
    );
  }

  @route("/", Method.POST)
  async create() {
    const body = this.ctx.request.body;
    const todo = await this.todoService.create(body);
    this.renderWith(
      {
        standard: "create",
        result: todo,
      },
      {
        serializer: StandardSerializer,
      }
    );
  }

  @route("/:id", Method.PUT)
  async update() {
    const { id } = this.ctx.request.params;
    const body = this.ctx.request.body;
    const todo = await this.todoService.findById(id);
    if (!todo) throw new BadRequest(`Todo with id ${id} not found`);
    Object.assign(todo, body);
    await this.todoService.update(todo);
    this.renderWith(
      {
        standard: "update",
        result: todo,
      },
      {
        serializer: StandardSerializer,
      }
    );
  }


  @route("/:id", Method.DELETE)
  async deleteById() {
    const { id } = this.ctx.request.params;
    const body = this.ctx.request.body;
    const todo = await this.todoService.findById(id);
    if (!todo) throw new BadRequest(`Todo with id ${id} not found`);
    Object.assign(todo, body);
    await this.todoService.deleteById(id);
    this.renderWith(
      {
        standard: "delete",
        result: todo,
      },
      {
        serializer: StandardSerializer,
      }
    );
  }
}
