let service = {};
import models from '../models';
let JoinTask = models.JoinTask;

service.createJoinTask = async ({ user_id, task_id }) => {
    try {
        const create = await JoinTask.create({ user_id: user_id, task_id: task_id });
        return create;
    } catch (error) {
        console.log(error)
    }
};
service.updateJoinTask = async ({ user_id, task_id, status }) => {
    let join
    try {
        join = await JoinTask.findOne({
            where: {
                user_id: user_id,
                task_id: task_id
            }
        });
    } catch (error) {
        console.log(error)
    }
    if (!join) {
        let error = new Error("update: user don't join this task")
        error.code = 404
        throw error
    }
    join.status = status
    join = await join.save();
    return join;
};
service.deleteJoinTask = async ({ user_id, task_id }) => {
    let join
    try {
        join = await JoinTask.findOne({
            where: {
                user_id: user_id,
                task_id: task_id
            }
        });
    } catch (error) {
        console.log(error)
    }
    if (!join) {
        let error = new Error("delete: user don't join this task")
        error.code = 404
        throw error
    }
    await join.destroy();
    return join;
};

export default service;