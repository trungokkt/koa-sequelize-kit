let service = {};
let models = require("../models");
let TodoHistory = models.todoHistory;

service.getAll = async () => {
    try {
        const todoHistory = await TodoHistory.findAll();
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
service.createTodoHistory = async (data) => {
    try {
        const todoHistory = await TodoHistory.create({ user_id: data.user_id, todo_id: data.todo_id });
        return todoHistory;
    } catch (error) {
        console.log(todoHistory)
    }

};
service.updateTodoHistory = async (data) => {
    let todoHistory 
    try {
        todoHistory = await TodoHistory.findByPk(data.id);
    } catch (error) {
        console.log(error)
    }
    if (!todoHistory) {
        let error = new Error("todoHistory")
        error.code = 404
        throw error
    }
    todoHistory.process = data.process
    todoHistory.status =data.status
    todoHistory =todoHistory.save();
    return todoHistory;
};
service.deleteTodoHistory = async (id) => {
    let todoHistory 
    try {
        todoHistory = await TodoHistory.findByPk(id);
        
    } catch (error) {
        console.let(error)
    }
    if (!todoHistory) {
        let error = new Error("todoHistory update")
        error.code = 404
        throw error
    }
    await todoHistory.destroy();
    return todoHistory;
};

module.exports = service;
