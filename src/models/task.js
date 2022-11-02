const TaskModel = (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        total_todo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        total_todo_completed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        completeDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: 'tasks'
    })
    Task.associate = (models) => {
        Task.hasMany(models.JoinTask, { foreignKey: { name: "task_id", allowNull: false }, onDelete: "RESTRICT" });
        Task.hasMany(models.MediaFile, { foreignKey: { name: "task_id", allowNull: true }, onDelete: "RESTRICT" });
        Task.hasMany(models.Category, { foreignKey: { name: "task_id", allowNull: false }, onDelete: "RESTRICT" })
    }
    return Task
}

export default TaskModel