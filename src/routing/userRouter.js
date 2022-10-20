const Router = require('koa-router')
const router = Router()
const userService = require("../services/userServices")

router.get("/users", async (ctx, next) => {
    const users = await userService.getAll()
    ctx.body = users
});
router.get("/users/:id", async (ctx, next) => {
    const user = await userService.getByPK(ctx.params.id)
    ctx.body = user
});
router.post("/users", async (ctx, next) => {
    const name = ctx.request.body.name
    const user = await userService.createUser(name)
    ctx.body = user
});
router.put("/users", async (ctx, next) => {
    const user = ctx.request.body
    const u = await userService.updateUser(user)
    ctx.body = u
});
router.delete("/users", async (ctx, next) => {
    const id = ctx.request.body.id
    const user = await userService.deleteUser(id)
    ctx.body = user
});

module.exports = router