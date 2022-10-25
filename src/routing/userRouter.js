import Router from 'koa-router';
const router = Router({ prefix: '/users' })
import userService  from "../services/userServices"

router.get("/", async (ctx, next) => {
    try {
        const { offset, limit , sort, directions} = ctx.request.query

        const users = await userService.getAll(offset, limit , sort , directions)
        ctx.body = users
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

});
router.get("/:id", async (ctx, next) => {
    try {
        const user = await userService.getByPK(ctx.params.id)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
});
router.post("/", async (ctx, next) => {
    try {
        const name = ctx.request.body.name
        if (!name) {
            ctx.status = 400
            throw new Error("name cannot be null")
        }
        const user = await userService.createUser(name)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
});
router.put("/", async (ctx, next) => {
    try {
        const user = ctx.request.body
        if (!user || !user.name || !user.id) {
            const error = new Error("input is not true")
            error.code = 400
            throw error
        }
        const u = await userService.updateUser(user)
        ctx.body = u
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
});
router.delete("/:id", async (ctx, next) => {
    try {
        const id = ctx.params.id
        const user = await userService.deleteUser(id)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
});

export default router