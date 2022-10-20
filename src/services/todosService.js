let service = {};
let models = require("../models");
let Todo = models.todo;
let User = models.user;

service.getAll = async () => {
    const todos = await Todo.findAll();
    return todos;
};
service.getById = async (id) => {
    const todo = await Todo.findAll({
        where: {
            id: id
        },
        include: User
    });
    return todo;
};
service.createTodo = async (name, user_id) => {
    const todo = await Todo.create({ name: name, user_id: user_id });
    return todo;
};
service.updateTodo = async (data) => {
    let todo = await Todo.findByPk(data.id);
    if (!todo) {
        return []
    }
    todo = await todo.update({
        name: data.name,
        process: data.process
    })
    // const todo = await Todo.update(
    //     { name: data.name },
    //     {
    //         where: {
    //             id: data.id,
    //         },
    //     }
    // );
    return todo;
};
service.deleteTodo = async (id) => {
    const todo = await Todo.destroy({
        where: {
            id: id,
        },
        returning: true,
        plain: true

    });
    return todo;
};
module.exports = service;
