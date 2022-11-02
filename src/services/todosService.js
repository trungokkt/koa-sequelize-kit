import models from '@babel-models';
let Todo = models.Todo;
let Task = models.Task;
let User = models.User
let service = {};
service.getAll = async ({ task_id, user_id, offset = 0, limit = 10, sort, directions = "DESC", extend = false }) => {
    let options = {
        where: {}
    }
    if (extend === true) {
        options.include = [
            {
                model: Task,
                attributes: ["name", "status", "createdAt"]
            },
            {
                model: User,
                attributes: ["name", "username"]
            }
        ]
    }
    if (task_id) {
        options.where.task_id = task_id
    }
    if (user_id) {
        options.where.user_id = user_id
    }
    if (limit !== 0) { //limit = 0  get all
        options.offset = offset
        options.limit = limit
    }

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
service.createTodo = async ({ task_id, name, description }) => {
    try {
        const todo = await Todo.create({ task_id: task_id, name: name, description: description });
        return todo;
    } catch (error) {
        throw error
    }

};
service.updateTodo = async ({ id, name, description, completed, user_id }) => {
    let todo
    try {
        todo = await Todo.findByPk(id);
    } catch (error) {
        console.log(error)
    }
    if (!todo) {
        let error = new Error("can not find todo with id :" + id)
        error.code = 404
        throw error
    }
    console.log(user_id, todo.user_id)
    if (user_id !== todo.user_id) {
        throw new Error("user don't join this todo")
    }
    if (name) {
        todo.name = name
    }
    if (description) {
        todo.description = description
    }
    if (completed !== undefined) {

        todo.completed = completed

    }
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
        let error = new Error("can not find todo with id :" + id)
        error.code = 404
        throw error
    }
    await todo.destroy();
    return todo;
};
service.joinTodo = async ({ todo_id, user_id }) => {
    let todo
    try {
        todo = await Todo.findByPk(todo_id);
    } catch (error) {
        console.log(error)
    }
    if (!todo) {
        let error = new Error("can not find todo with id :" + todo_id)
        error.code = 404
        throw error
    }
    todo.user_id = user_id
    todo = await todo.save();
    return todo;
};
export default service;
