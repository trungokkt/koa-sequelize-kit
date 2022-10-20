const dbConfig = require("../configuration/config.json");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: { 
    ssl: true,
    options: {
      encrypt: true,
      
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
 
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const Todo  = require("./todo")(sequelize, Sequelize);
const User  = require("./user")(sequelize, Sequelize);
User.hasMany(Todo, {foreignKey: 'user_id'})
Todo.belongsTo(User, {foreignKey: 'user_id'})

db.todo = Todo
db.user = User
module.exports = db;