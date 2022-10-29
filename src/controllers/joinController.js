import JoinService from "../services/JoinService"

const createJoinTask = async (ctx, next) => {
    try {
        const user_id = ctx.user.id
        const task_id = ctx.request.body.task_id
        const join = await JoinService.createJoinTask({ user_id, task_id })
        ctx.body = join
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
const updateJoinTask = async (ctx, next) => {
    try {
        let data = ctx.request.body
        data.user_id = ctx.user.id
        const join = await JoinService.updateJoinTask(data)
        ctx.body = join
    } catch (error) {
        ctx.throw(error.code, error.message);
    }

}
const deleteJoinTask = async (ctx, next) => {
    try {
        const user_id = ctx.user.id
        const task_id = ctx.params.id
        const join = await JoinService.deleteTodoHistory({user_id,task_id})
        ctx.body = join
    } catch (error) {
        ctx.throw(error.code, error.message);
    }
}
export {
    createJoinTask,
    updateJoinTask,
    deleteJoinTask
}