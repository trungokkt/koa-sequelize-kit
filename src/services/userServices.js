import models from '../models';
import { generateJwt } from './jwtService'
let User = models.User;
let service = {};

service.getAll = async ({ offset = 0, limit = 10, sort, directions = "DESC" }) => {
    try {
        let options = { offset: offset, limit: limit }
        //check input
        if (sort) {
            options.order = [[sort, directions]]
        }
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
service.createUser = async ({ username, name, password }) => {
    try {
        const f_user = await User.findOne({
            where: {
                username: username
            }
        })
        if (f_user) {
            let error = new Error(username + " is existed")
            error.code = 400
            throw error
        }
    } catch (error) {
        throw error
    }

    //if user not exists
    try {
        const c_user = await User.create({ name: name, username: username, password: password });
        return c_user;
    } catch (error) {
        console.log(error)
    }
};
service.updateUser = async ({ id, name }) => {
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
    user.name = name
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
service.checkLogin = async ({ username, password }) => {
    try {
        const user = await User.checkLogin(username, password);
        let token = generateJwt(user);
        return token
    } catch (error) {
        throw error
    }
}
export default service;