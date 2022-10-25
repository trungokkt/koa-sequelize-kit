"use strict";

const Router = require('koa-router');
const router = Router({
  prefix: '/history'
});
const todoHistoryService = require("../services/todoHistoryService");
router.get("/", async (ctx, next) => {
  try {
    const history = await todoHistoryService.getAll();
    ctx.body = history;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.get("/:id", async (ctx, next) => {
  try {
    const history = await todoHistoryService.getById(ctx.params.id);
    ctx.body = history;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.post("/", async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const todo = await todoHistoryService.createTodoHistory(data);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.put("/", async (ctx, next) => {
  try {
    const data = ctx.request.body;
    const todo = await todoHistoryService.updateTodoHistory(data);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
router.delete("/", async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const todo = await todoHistoryService.deleteTodoHistory(id);
    ctx.body = todo;
  } catch (error) {
    ctx.throw(error.code, error.message);
  }
});
module.exports = router;