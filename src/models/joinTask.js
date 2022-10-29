const JoinTaskModel = (sequelize, DataTypes) => {
    const JoinTask = sequelize.define("joinTask", {
        user_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        task_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        tableName: 'joinTask'
    })
    JoinTask.associate = (models) => {
        JoinTask.belongsTo(models.User, { foreignKey: { name: "user_id", allowNull: false }, onDelete: "RESTRICT" });
        JoinTask.belongsTo(models.Task, { foreignKey: { name: "task_id", allowNull: false }, onDelete: "RESTRICT" });
    }
    return JoinTask
}
export default JoinTaskModel