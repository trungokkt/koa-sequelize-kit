import todoHistoryService from "../services/todoHistoryService"

const getAllTodoHistory = async (ctx, next) => {
    try {
        const options = ctx.request.query
        const history = await todoHistoryService.getAll(options)
        ctx.body = history
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const getDetailTodoHistory = async (ctx, next) => {
    try {
        const history = await todoHistoryService.getById(ctx.params.id)
        ctx.body = history
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const createTodoHistory = async (ctx, next) => {
    try {
        const user_id = ctx.user.id
        const todo_id = ctx.request.body.todo_id
        const todo = await todoHistoryService.createTodoHistory({ user_id, todo_id })
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const updateTodoHistory = async (ctx, next) => {
    try {
        const data = ctx.request.body
        const todo = await todoHistoryService.updateTodoHistory(data)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const deleteTodoHistory = async (ctx, next) => {
    try {
        const id = ctx.params.id
        const todo = await todoHistoryService.deleteTodoHistory(id)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}

export {
    getAllTodoHistory,
    getDetailTodoHistory,
    createTodoHistory,
    updateTodoHistory,
    deleteTodoHistory
}