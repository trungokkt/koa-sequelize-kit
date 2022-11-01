import bcrypt from "bcrypt"
const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
        }
    }, {
        tableName: "users",
        hooks: {
            beforeCreate: (user, options) => {
                const saltRounds = parseInt(process.env.SALT_ROUNDS)
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(user.password, salt);
                user.password = hash
            },
        }
    })
    User.associate = (models) => {
        User.hasMany(models.Todo, { foreignKey: { name: "user_id", allowNull: false }, onDelete: "RESTRICT" });
        User.hasMany(models.JoinTask, { foreignKey: { name: "user_id", allowNull: false }, onDelete: "RESTRICT" });
    };
    User.checkLogin = async (username, password) => {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        if (!user) {
            const error = new Error("username is wrong")
            error.code = 401
            throw error
        }
        if (!bcrypt.compareSync(password, user.password)) {
            const error = new Error("password is wrong")
            error.code = 401
            throw error
        }
        return user
    }
    return User
}
export default UserModel;
