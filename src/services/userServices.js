let service = {};
let models = require("../models");
let User = models.user;

service.getAll = async (offset = 0, limit = 10, sort , directions = "DESC") => {
    try {
        let options={ offset: offset, limit: limit }
        //check input

        if(sort){
           options.order = [[sort, directions]]
        }
        console.log(options)
        const users = await User.findAll(options);
        return users;
    } catch (error) {
        console.log(error)
    }
    
};
service.getByPK = async (id) => {
    try {
        const users = await User.findByPk(id);
        return users;
    } catch (error) {
        console.log(error)
    }
    
};
service.createUser = async (name) => {
    try {
        const user = await User.create({ name: name });
        return user;
    } catch (error) {
        console.log(error)
    }
};
service.updateUser = async (data) => {
    let user 
    try {
        user = await User.findByPk(data.id)
    } catch (error) {
        console.log(error)
    }
    if (!user) {
        const error = new Error("user.id not exists")
        error.code = 400
        throw error
    }
    user.name = data.name
    user = await user.save()
    
    return user;
};
service.deleteUser = async (id) => {
    let user
    try {
        user = await User.findByPk(id)
    } catch (error) {
        console.log(error)
    }
   
    if (!user) {
        const error = new Error("user.id not exists")
        error.code = 400
        throw error
    }
    await user.destroy()
    return user;
};
module.exports = service;
