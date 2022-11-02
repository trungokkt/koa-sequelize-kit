const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.TEXT
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
        tableName: 'categories'
    })
    Category.associate = (models) => {
        Category.belongsTo(models.Task, { foreignKey: { name: "task_id", allowNull: false }, onDelete: "RESTRICT" });
        Category.hasMany(models.Todo, { foreignKey: { name: "category_id", allowNull: false }, onDelete: "RESTRICT" });
    }
    return Category
}
export default CategoryModel