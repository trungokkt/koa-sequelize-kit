"use strict";

const Router = require('koa-router');
const router = Router({
  prefix: '/history'
});
const todoHistoryService = require("../services/todoHistoryService");
router.get("/", async (ctx, next) => {
  const history = await todoHistoryService.getAll();
  ctx.body = history;
});
router.get("/:id", async (ctx, next) => {
  const history = await todoHistoryService.getById(ctx.params.id);
  ctx.body = history;
});
router.post("/", async (ctx, next) => {
  const data = ctx.request.body;
  const todo = await todoHistoryService.createTodoHistory(data);
  ctx.body = todo;
});
router.put("/", async (ctx, next) => {
  const data = ctx.request.body;
  const todo = await todoHistoryService.updateTodoHistory(data);
  ctx.body = todo;
});
router.delete("/", async (ctx, next) => {
  const id = ctx.request.body.id;
  const todo = await todoHistoryService.deleteTodoHistory(id);
  ctx.body = todo;
});
module.exports = router;