import Sequelize from 'sequelize';

import UserModel from './user';
import TodoModel from './todo';
import TaskModel from './task';
import JoinTaskModel from './joinTask';

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        // host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    }
);

const models = {
    User: UserModel(sequelize, Sequelize),
    Todo: TodoModel(sequelize, Sequelize),
    Task: TaskModel(sequelize, Sequelize),
    JoinTask: JoinTaskModel(sequelize, Sequelize)
};


models.Todo.afterCreate(async (todo, options) => {
    let task = await models.Task.findByPk(todo.task_id)
    await task.increment('total_todo');
});
models.Todo.beforeUpdate((todo, options) => {
    if (todo.completed == true) {
        todo.completeDate = new Date();
    }
})
models.Todo.afterUpdate(async (todo, options) => {
    let task = await models.Task.findByPk(todo.task_id)
    let countTodoCompleted = await models.Todo.count({
        where: { completed: true },
      })

    task.total_todo_completed = countTodoCompleted
    if (task.total_todo_completed === task.total_todo) {
        task.completeDate = new Date();
    }
    await task.save()
})
models.Todo.afterDestroy(async (todo, options) => {
    let task = await models.Task.findByPk(todo.task_id)
    task.total_todo--
    if (todo.completed === true) {
        task.total_todo_completed--
    }
    await task.save();
})

//set relationship
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export { sequelize };
export default models