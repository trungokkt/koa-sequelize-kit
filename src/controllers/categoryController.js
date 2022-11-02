import categoryService from '@babel-services/categoryService'
const getAll = async (ctx, next) => {
    try {
        const task_id = ctx.request.query.task_id
        const category = await categoryService.getAll(task_id)
        ctx.body = category
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const createList = async (ctx, next) => {
    try {
        const data = ctx.request.body
        const category = await categoryService.createList(data)
        ctx.body = category
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const updateList = async (ctx, next) => {
    try {
        const data = ctx.request.body
        const list_item = await categoryService.updateList(data)
        ctx.body = list_item
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
// const deleteList = async (ctx, next) => {
//     try {

//     } catch (error) {
//         ctx.throw(error.code, error.message);
//     }
// }

export {
    getAll,
    createList,
    updateList,
    // deleteList
}