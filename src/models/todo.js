const TodoModel = (sequelize ,DataTypes) => {
    const Todo = sequelize.define("todo", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        completeDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt:{ 
            type: DataTypes.DATE,
            defaultValue: new Date()
         },
        updatedAt: { 
            type: DataTypes.DATE,
         },
         user_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
         },
         task_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
         }
    },{
        tableName: 'todos',
    })
    Todo.associate = (models) => {
        Todo.belongsTo(models.Task, { foreignKey: { name: "task_id"}, onDelete:"RESTRICT" });
        Todo.belongsTo(models.User, { foreignKey: { name: "user_id"}, onDelete:"RESTRICT" });
    }
    return Todo
}

export default TodoModel