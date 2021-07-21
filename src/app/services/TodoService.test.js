const TodoService = require("./TodoService");

let todoService = new TodoService();
let todo;
describe("TodoService", () => {
  beforeEach(async () => {
    todoService = new TodoService();
    todo = await todoService.create({
      user_id: 1,
      todolabel: "TEST TODO"
    });
  });
  it("should create a new todo", async () => { });
  it("should find todo by id", async () => {
    const found = await todoService.findById(todo.id);
    expect(found).toBeDefined();
    expect(found).toMatchObject({
      user_id: 1,

    });
  });
  it("should return all todos", async () => {
    await todoService.create({
      user_id: 1,
      todolabel: "TEST TODO"
    });
    const todo = await todoService.find();
    expect(todo.length).toBe(2);
  });
  it("should return all todos filter by title", async () => {
    await todoService.create({
      user_id: 1,
      todo: "TEST TODO"
    });
    const todo = await todoService.find({
      filterByTitle: "Another",
    });
    expect(todo.length).toBe(1);
  });
  it("should delete todo by id", async () => {
    await todoService.deleteById(todo.id);
    const todos = await todoService.find();
    expect(todos.length).toBe(0);
  });
  it("should update todo", async () => {
    todo.todolabel = "Test Update";
    await todoService.update(todo);
    const found = await todoService.findById(todo.id);
    expect(found).toMatchObject({
      todolabel: "Test Update",
    });
  });
});
