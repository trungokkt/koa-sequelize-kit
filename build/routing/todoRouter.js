"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _todosService = _interopRequireDefault(require("../services/todosService"));
const router = (0, _koaRouter.default)({
  prefix: '/todos'
});
router.get("/", async (ctx, next) => {
  try {
    const todos = await _todosService.default.getAll();
    ctx.body = todos;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.get("/:id", async (ctx, next) => {
  try {
    const todo = await _todosService.default.getById(ctx.params.id);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.post("/", async (ctx, next) => {
  try {
    const {
      name,
      description
    } = ctx.request.body;
    const todo = await _todosService.default.createTodo(name, description);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.put("/", async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const todo = await _todosService.default.updateTodo(data);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.delete("/:id", async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await _todosService.default.deleteTodo(id);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
var _default = router;
exports.default = _default;