const Router = require('koa-router')
const router = Router()
const todoService = require("../services/todosService")

router.get("/todos", async (ctx, next) => {
    const users = await todoService.getAll()
    ctx.body = users
});

router.get("/todos/:id", async (ctx, next) => {
    const user = await todoService.getById(ctx.params.id)
    ctx.body = user
});
router.post("/todos", async (ctx, next) => {
    const name = ctx.request.body.name
    const user_id = ctx.request.body.user_id
    const todo = await todoService.createTodo(name,user_id)
    ctx.body = todo
});
router.put("/todos", async (ctx, next) => {
    const data = ctx.request.body
    const todo = await todoService.updateTodo(data)
    ctx.body = todo
});
router.delete("/todos", async (ctx, next) => {
    const id = ctx.request.body.id
    const todo = await todoService.deleteTodo(id)
    ctx.body = todo
});

module.exports = router