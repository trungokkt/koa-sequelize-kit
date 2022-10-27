let service = {};
import models from '../models';
let TodoHistory = models.TodoHistory;
let User = models.User;
let Todo = models.Todo;

service.getAll = async ({ offset = 0, limit = 10, sort, directions = "DESC" }) => {
    try {
        let options = {
            offset: offset, limit: limit, include: [User, Todo],  raw: true, nest: true
        }
        //check input
        if (sort) {
            options.order = [[sort, directions]]
        }
        const todoHistory = await TodoHistory.findAll(options);
        return todoHistory;
    } catch (error) {
        console.log(error)
    }
};
service.getById = async (id) => {
    try {
        const todoHistory = await TodoHistory.findAll({
            where: {
                id: id
            }
        });
        return todoHistory;
    } catch (error) {
        console.log(error)
    }
};
service.createTodoHistory = async ({ user_id, todo_id }) => {
    try {
        const todoHistory = await TodoHistory.create({ user_id: user_id, todo_id: todo_id });
        return todoHistory;
    } catch (error) {
        console.log(error)
    }
};
service.updateTodoHistory = async ({ id, process, status, comment }) => {
    let todoHistory
    try {
        todoHistory = await TodoHistory.findOne({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log(error)
    }
    if (!todoHistory) {
        let error = new Error("update: todo history not exist")
        error.code = 404
        throw error
    }
    todoHistory.process = process || todoHistory.process
    todoHistory.status = status === undefined ? todoHistory.status : status
    todoHistory.comment = comment || todoHistory.comment
    todoHistory = await todoHistory.save();
    return todoHistory;
};
service.deleteTodoHistory = async (id) => {
    let todoHistory
    try {
        todoHistory = await TodoHistory.findByPk(id);

    } catch (error) {
        console.log(error)
    }
    if (!todoHistory) {
        let error = new Error("delete: todo history not exist")
        error.code = 404
        throw error
    }
    await todoHistory.destroy();
    return todoHistory;
};
export default service;