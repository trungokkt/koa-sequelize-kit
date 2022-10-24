const Router = require('koa-router')
const router = Router({ prefix: '/todos' })
const todoService = require("../services/todosService")

router.get("/", async (ctx, next) => {
    try {
        const todos = await todoService.getAll()
        ctx.body = todos
    } catch (error) {
        ctx.throw(error.code , error.message);
    }
    
});
router.get("/:id", async (ctx, next) => {
    try {
        const todo = await todoService.getById(ctx.params.id)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code , error.message);
    }

});
router.post("/", async (ctx, next) => {
    try {
        const { name, description } = ctx.request.body
        const todo = await todoService.createTodo(name, description)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code , error.message);
    }

});
router.put("/", async (ctx, next) => {
    try {
        const data = ctx.request.body
        const todo = await todoService.updateTodo(data)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code , error.message);
    }

});
router.delete("/:id", async (ctx, next) => {
    try {
        const id = ctx.params.id
        const todo = await todoService.deleteTodo(id)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code , error.message);
    }

});

module.exports = router