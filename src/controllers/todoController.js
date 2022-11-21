import todoService from "@babel-services/todosService"

const getAllTodoUserJoined = async (ctx) => {
    try {
        const options = ctx.request.query
        const todos = await todoService.getAll(options)
        ctx.body = todos
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const getDetailTodo = async (ctx) => {
    try {
        const todo = await todoService.getById(ctx.params.id)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const createTodo = async (ctx) => {
    try {
        const data = ctx.request.body
        const todo = await todoService.createTodo(data)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const updateTodo = async (ctx) => {
    try {
        const data = ctx.request.body
        data.user_id = ctx.user.id
        const todo = await todoService.updateTodo(data)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const deleteTodo = async (ctx) => {
    try {
        const id = ctx.params.id
        const todo = await todoService.deleteTodo(id)
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const JoinTodo = async (ctx) => {
    try {
        const todo_id = ctx.request.body.todo_id
        const user_id = ctx.user.id
        const todo = await todoService.joinTodo({ todo_id, user_id })
        ctx.body = todo
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
export {
    getAllTodoUserJoined,
    getDetailTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    JoinTodo
}