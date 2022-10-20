let service = {};
let models = require("../models");
let User = models.user;

service.getAll = async () => {
    const users = await User.findAll();
    return users;
};
service.getByPK = async (id) => {
    const users = await User.findByPk(id);
    return users;
};
service.createUser = async (name) => {
    const user = await User.create({ name: name });
    return user;
};
service.updateUser = async (data) => {
    const user = await User.update(
        { name: data.name },
        {
            where: {
                id: data.id,
            },
        }
    );
    return user;
};
service.deleteUser = async (id) => {
    const user = await User.destroy({
        where: {
            id: id,
        },
        returning: true,
    });
    return user;
};
module.exports = service;
