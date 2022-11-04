import Sequelize from 'sequelize';

import UserModel from '@babel-models/user';
import TodoModel from '@babel-models/todo';
import TaskModel from '@babel-models/task';
import JoinTaskModel from '@babel-models/joinTask';
import MediaFileModel from '@babel-models/mediafile';
import CategoryModel from '@babel-models/category';
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
    JoinTask: JoinTaskModel(sequelize, Sequelize),
    MediaFile: MediaFileModel(sequelize, Sequelize),
    Category: CategoryModel(sequelize,Sequelize)
};


models.Todo.afterCreate(async (todo, options) => {
    let category = await models.Category.findByPk(todo.category_id)
    let task = await models.Task.findByPk(category.task_id)
    await task.increment('total_todo');
});
models.Todo.beforeUpdate((todo, options) => {
    if (todo.completed == true) {
        todo.completeDate = new Date();
    }
})
models.Todo.afterUpdate(async (todo, options) => {
    let category = await models.Category.findByPk(todo.category_id)
    let task = await models.Task.findByPk(category.task_id)
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
    let category = await models.Category.findByPk(todo.category_id)
    let task = await models.Task.findByPk(category.task_id)
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