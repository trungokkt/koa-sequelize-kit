const TodoModel = (sequelize, DataTypes) => {
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
            defaultValue: false
        },
        completeDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: 'todos',
    })
    Todo.associate = (models) => {
        Todo.belongsTo(models.User, { foreignKey: { name: "user_id", allowNull: true, }, onDelete: "RESTRICT" });
        Todo.belongsTo(models.Category, { foreignKey: { name: "category_id" }, onDelete: "RESTRICT" });
    }
    return Todo
}

export default TodoModel