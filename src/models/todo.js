module.exports = (sequelize ,DataTypes) => {
    const Todo = sequelize.define("todo", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
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
        endAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt:{ 
            type: DataTypes.DATE,
            defaultValue: new Date()
         },
        updatedAt: { 
            type: DataTypes.DATE,
         },
    },{
        hooks : {
            beforeUpdate : (todo, options) => {
                if(todo.process >= 100){
                    todo.process = 100
                    todo.endAt = new Date()
                }
            }
        }
    })
    
    return Todo
}