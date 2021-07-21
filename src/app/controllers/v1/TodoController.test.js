import request from "supertest";
import TodoService from "../../services/TodoService";
import app from "@system/Application";
const todos = [
  {
    user_id: 1,
    todolabel: "TEST TODO"
  },
];

const url = "/v1/todos";
jest.mock("../../services/TodoService", () => jest.fn());
TodoService.mockImplementation(() => ({
  find: jest.fn().mockReturnValue(
    todos.map((todo) => {
      todo.get = jest.fn().mockReturnValue(todo);
      return todo;
    })
  ),
  create: jest.fn((arg) => ({
    get: () => arg,
  })),
}));

describe("V1::TodoController", () => {
  describe("GET /v1/todos", () => {
    test("return the list result", async () => {
      const response = await request(app.callback()).get(url);
      expect(response.status).toBe(200);
      expect(response.type).toEqual("application/json");
      expect(response.body.result.length).toBe(1);
    });
  });
  describe("POST /v1/todos", () => {
    test("return the created todo", async () => {
      const response = await request(app.callback()).post(url).send({
        user_id: 1,
        todolabel: "TEST TODO"
      });
      expect(response.status).toBe(200);
      expect(response.type).toEqual("application/json");
      expect(response.body.result).toMatchObject({
        user_id: 1,
      });
    });
  });
});
