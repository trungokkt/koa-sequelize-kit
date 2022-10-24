const dbConfig = require("../configuration/config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: false,
        options: {
            encrypt: true,
        },
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
const Todo = require("./todo")(sequelize, Sequelize);
const User = require("./user")(sequelize, Sequelize);
const TodoHistory = require("./todoHistory")(sequelize, Sequelize);

Todo.hasMany(TodoHistory, { foreignKey: "todo_id" });
TodoHistory.belongsTo(Todo, { foreignKey: "todo_id" });

User.hasMany(TodoHistory, { foreignKey: "user_id" });
TodoHistory.belongsTo(User, { foreignKey: "user_id" });

TodoHistory.addHook("afterUpdate", (todoHistory, options) => {
    if (todoHistory.process === 100) {
        Todo.update(
            { completed: true },
            {
                where: {
                    id: todoHistory.todo_id,
                },
            }
        );
    }
});


db.todo = Todo;
db.user = User;
db.todoHistory = TodoHistory;
module.exports = db;
