module.exports = (sequelize ,DataTypes) => {
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
    createdAt:{ 
        type: DataTypes.DATE,
        defaultValue: new Date()
     },
    updatedAt: { 
        type: DataTypes.DATE,
     },
},{
    tableName: 'todoHistory'
})

return TodoHistory
}
