"use strict";

const Router = require('koa-router');
const router = Router({
  prefix: '/todos'
});
const todoService = require("../services/todosService");
router.get("/", async (ctx, next) => {
  const todos = await todoService.getAll();
  ctx.body = todos;
});
router.get("/:id", async (ctx, next) => {
  const todo = await todoService.getById(ctx.params.id);
  ctx.body = todo;
});
router.post("/", async (ctx, next) => {
  const {
    name,
    description
  } = ctx.request.body;
  const todo = await todoService.createTodo(name, description);
  ctx.body = todo;
});
router.put("/", async (ctx, next) => {
  const data = ctx.request.body;
  const todo = await todoService.updateTodo(data);
  ctx.body = todo;
});
router.delete("/", async (ctx, next) => {
  const id = ctx.request.body.id;
  const todo = await todoService.deleteTodo(id);
  ctx.body = todo;
});
module.exports = router;