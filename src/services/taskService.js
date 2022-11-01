import models from '../models';
let Task = models.Task;
let Todo = models.Todo;

let service = {};
service.getAll = async ({ offset = 0, limit = 10, sort, directions = "DESC" }) => {
    let options = { offset: offset, limit: limit }
    //check input
    if (sort) {
        options.order = [[sort, directions]]
    }
    let tasks
    try {
        tasks = await Task.findAll(options);
    } catch (error) {
        console.log(error)
    }

    return tasks;
};
service.getById = async (id) => {
    try {
        const task = await Task.findOne({
            where: {
                id: id
            },
            include: Todo
        });
        return task;
    } catch (error) {
        console.log(error)
    }
};
service.createTask = async (name, description, attached_files) => {
    try {
        const task = await Task.create({ name: name, description: description, attached_files: attached_files });
        return task;
    } catch (error) {
        console.log(error)
    }
};
service.updateTask = async ({ id, name, description, attached_files, new_attached_files }) => {
    let task
    try {
        task = await Task.findByPk(id);
    } catch (error) {
        console.log(error)
    }
    if (!task) {
        let error = new Error("can not find task with id :" + id)
        error.code = 404
        throw error
    }
    if (name) {
        task.name = name
    }
    if (description) {
        task.description = description
    }
    task.attached_files = [...attached_files, ...new_attached_files]
    task = await task.save();
    return task;
};
service.deleteTask = async (id) => {
    let task
    try {
        task = await Task.findByPk(id);
    } catch (error) {
        console.log(error)
    }
    if (!task) {
        let error = new Error("can not find todo with id :" + data.id)
        error.code = 404
        throw error
    }
    await task.destroy();
    return task;
};
export default service;