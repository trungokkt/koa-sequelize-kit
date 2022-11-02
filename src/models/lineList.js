const LineListModel = (sequelize, DataTypes) => {
    const LineList = sequelize.define("lineList", {
        name: {
            type: DataTypes.INTEGER
        },
        index:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: 'lineList'
    })
    LineList.associate = (models) => {
        LineList.belongsTo(models.Task, { foreignKey: { name: "task_id", allowNull: false }, onDelete: "RESTRICT" });
        LineList.hasMany(models.Todo, { foreignKey: { name: "line_list", allowNull: false }, onDelete: "RESTRICT" });
    }
    return LineList
}
export default LineListModel