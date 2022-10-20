module.exports = (sequelize ,DataTypes) => {
    const Todo = sequelize.define("todo", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        completeDate: {
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
        tableName: 'todos',
        hooks : {
            beforeUpdate : (todo, options) => {
                if(todo.completed ==true){
                    todo.completeDate = new Date()
                }
            }
        }
    })
    
    return Todo
}