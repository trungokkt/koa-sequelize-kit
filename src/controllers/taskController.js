import taskService from "../services/taskService"

const getAllTask =async (ctx, next) => {
    try {
        const options = ctx.request.query
        const tasks = await taskService.getAll(options)
        ctx.body = tasks
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const getDetailTask=async (ctx, next) => {
    try {
        const task = await taskService.getById(ctx.params.id)
        ctx.body = task
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const createTask =async (ctx, next) => {
    try {
        const { name, description } = ctx.request.body
        const task = await taskService.createTask(name, description)
        ctx.body = task
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const updateTask=async (ctx, next) => {
    try {
        const data = ctx.request.body
        const task = await taskService.updateTask(data)
        ctx.body = task
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const deleteTask=async (ctx, next) => {
    try {
        const id = ctx.params.id
        const task = await taskService.deleteTask(id)
        ctx.body = task
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}

export {
    getAllTask,
    getDetailTask,
    createTask,
    updateTask,
    deleteTask
}