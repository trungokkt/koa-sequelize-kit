import models from '../models';
let Todo = models.Todo;
let TodoHistory = models.TodoHistory;

let service = {};
service.getAll = async ({ offset = 0, limit = 10, sort, directions = "DESC" }) => {
    let options = { offset: offset, limit: limit }
    //check input
    if (sort) {
        options.order = [[sort, directions]]
    }
    let todos
    try {
        todos = await Todo.findAll(options);
    } catch (error) {
        console.log(error)
    }
    return todos;
};
service.getById = async (id) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: id
            },
            include: TodoHistory
        });
        return todo;
    } catch (error) {
        console.log(error)
    }
};
service.createTodo = async (name, description) => {
    try {
        const todo = await Todo.create({ name: name, description: description });
        return todo;
    } catch (error) {
        console.log(error)
    }

};
service.updateTodo = async (data) => {

    let todo
    try {
        todo = await Todo.findByPk(data.id);
    } catch (error) {
        console.log(error)
    }
    if (!todo) {
        let error = new Error("can not find todo with id :" + data.id)
        error.code = 404
        throw error
    }
    todo.name = data.name,
    todo.description = data.description
    todo = await todo.save();
    return todo;
};
service.deleteTodo = async (id) => {
    let todo
    try {
        todo = await Todo.findByPk(id);
    } catch (error) {

    }
    if (!todo) {
        let error = new Error("can not find todo with id :" + data.id)
        error.code = 404
        throw error
    }
    await todo.destroy();
    return todo;
};
export default service;
