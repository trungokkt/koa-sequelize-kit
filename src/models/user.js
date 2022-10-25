const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: "users",
    })
    User.associate = (models) => {
        User.hasMany(models.TodoHistory, { foreignKey: { name: "user_id", allowNull: false }, onDelete: "RESTRICT" });
    };
    return User
}
export default UserModel;
