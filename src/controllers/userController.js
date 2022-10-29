import userService from "../services/userServices"

const getAllUser = async (ctx, next) => {
    try {
        //const { offset, limit , sort, directions} = ctx.request.query
        const options = ctx.request.query
        const users = await userService.getAll(options)
        ctx.body = users
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const getDetailUser = async (ctx, next) => {
    try {
        const user = await userService.getByPK(ctx.user.id)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const createUser = async (ctx, next) => {
    try {
        const req_user = ctx.request.body
        const user = await userService.createUser(req_user)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const updateUser = async (ctx, next) => {
    try {
        const id = ctx.user.id
        const name = ctx.request.body.name
        const u = await userService.updateUser({ id, name })
        ctx.body = u
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const deleteUser = async (ctx, next) => {
    try {
        const id = ctx.user.id
        const user = await userService.deleteUser(id)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const loginUser = async (ctx, next) => {
    try {
        const req_user = ctx.request.body
        // if (!name) {
        //     ctx.status = 400
        //     throw new Error("name cannot be null")
        // }
        const token = await userService.Login(req_user)
        ctx.body = {
            token
        }
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}

export {
    getAllUser,
    getDetailUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}