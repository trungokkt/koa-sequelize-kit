import userService from "@babel-services/userServices"
import mediaService from "@babel-services/mediaService"
import { queueUploadAvatar } from "../queue/queue"
const getAllUser = async (ctx) => {
    try {
        const options = ctx.request.query
        const users = await userService.getAll(options)
        ctx.body = users
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const getDetailUser = async (ctx) => {
    try {
        const user = await userService.getByPK(ctx.user.id)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const createUser = async (ctx) => {
    try {
        const req_user = ctx.request.body
        const user = await userService.createUser(req_user)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const updateUser = async (ctx) => {
    try {
        const id = ctx.user.id
        const name = ctx.request.body.name
        const u = await userService.updateUser({ id, name })
        ctx.body = u
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const deleteUser = async (ctx) => {
    try {
        const id = ctx.user.id
        const user = await userService.deleteUser(id)
        ctx.body = user
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const loginUser = async (ctx) => {
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
const uploadAvatar = async (ctx) => {
    const job = await queueUploadAvatar(ctx.request.file, ctx.user.id)
    ctx.body = job
    // const media = await mediaService.createAvatar(ctx.request.file,ctx.user.id)
    // let data = {
    //     id: ctx.user.id,
    //     avatar: media.id
    // }
    // const user = await userService.updateUser(data)
    // ctx.body = {
    //     user,
    //     media
    // };
}
export {
    getAllUser,
    getDetailUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    uploadAvatar
}