module.exports = (sequelize, DataTypes) => {
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
        // hooks: {
        //     beforeUpdate: (user, options) => {
        //         user.name = user.name + "before"
        //     }
        // }
    })

    return User
}
