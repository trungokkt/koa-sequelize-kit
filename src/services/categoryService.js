let service = {};
import models from '@babel-models';
let Category = models.Category;
let Todo = models.Todo;

service.getAll = async (task_id) => {
    try {

        let options = {
            where: {
                task_id: task_id
            },
            include: [{ model: Todo }]
        }
        const list = await Category.findAll(options);
        return list;
    } catch (error) {
        console.log(error)
    }
};
service.createList = async ({ name, task_id, index = 0 }) => {
    try {
        const create = await Category.create({ name, task_id, index });
        return create;
    } catch (error) {
        console.log(error)
    }
};
service.updateList = async ({ id, name, index }) => {
    let list_item
    try {
        list_item = await Category.findOne({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log(error)
    }
    if (!list_item) {
        let error = new Error("update: list_item do not exist")
        error.code = 404
        throw error
    }
    if (name) list_item.name = name
    if (index) list_item.index = index
    list_item = await list_item.save();
    return list_item;
};
service.deleteList = async (id) => {
    let list_item
    try {
        list_item = await Category.findOne({
            where: {
                id: id,
            }
        });
    } catch (error) {
        console.log(error)
    }
    if (!list_item) {
        let error = new Error("delete: list_item do not exist")
        error.code = 404
        throw error
    }
    await list_item.destroy();
    return list_item;
};
export default service;