import taskService from "@babel-services/taskService"
import mediaService from '@babel-services/mediaService'
const getAllTask = async (ctx) => {
    try {
        const options = ctx.request.query
        const tasks = await taskService.getAll(options)
        ctx.body = tasks
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const getDetailTask = async (ctx) => {
    try {
        const task = await taskService.getById(ctx.params.id)
        ctx.body = task
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const createTask = async (ctx) => {
    try {
        const { name, description } = ctx.request.body
        const task = await taskService.createTask(name, description)
        let files = ctx.files
        for (const element of files) {
            element.task_id = task.id
        }
        const medias = await mediaService.createMediaFiles(files)
        ctx.body = task
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const updateTask = async (ctx) => {
    try {
        let data = ctx.request.body
        data.new_attached_files = ctx.files.map(file => file.filename)
        const task = await taskService.updateTask(data)
        ctx.body = task
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const deleteTask = async (ctx) => {
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