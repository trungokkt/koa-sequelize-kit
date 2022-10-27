import Sequelize from 'sequelize';

import UserModel from './user';
import TodoModel from './todo';
import TodoHistoryModel from './todoHistory';

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    }
);

const models = {
    User: UserModel(sequelize, Sequelize),
    Todo: TodoModel(sequelize, Sequelize),
    TodoHistory: TodoHistoryModel(sequelize, Sequelize),
};

// const hashPassword = async (password) => {
//     const hashedPassword = 
//     return password
// }


//set relationship
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export { sequelize };
export default models