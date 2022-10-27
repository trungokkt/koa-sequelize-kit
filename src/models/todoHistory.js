const TodoHistoryModel = (sequelize, DataTypes) => {
    const TodoHistory = sequelize.define("todoHistory", {
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        process: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'todoHistory'
    })
    TodoHistory.associate = (models) => {
        TodoHistory.belongsTo(models.Todo, { foreignKey: { name: "todo_id", allowNull: false }, onDelete: "RESTRICT" });
        TodoHistory.belongsTo(models.User, { foreignKey: { name: "user_id", allowNull: false }, onDelete: "RESTRICT" });
    }
    return TodoHistory
}
export default TodoHistoryModel