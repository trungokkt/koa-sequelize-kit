"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _todoHistoryService = _interopRequireDefault(require("../services/todoHistoryService"));
const router = (0, _koaRouter.default)({
  prefix: '/history'
});
router.get("/", async (ctx, next) => {
  try {
    const history = await _todoHistoryService.default.getAll();
    ctx.body = history;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.get("/:id", async (ctx, next) => {
  try {
    const history = await _todoHistoryService.default.getById(ctx.params.id);
    ctx.body = history;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.post("/", async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const todo = await _todoHistoryService.default.createTodoHistory(data);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.put("/", async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const todo = await _todoHistoryService.default.updateTodoHistory(data);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.delete("/", async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await _todoHistoryService.default.deleteTodoHistory(id);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
var _default = router;
exports.default = _default;