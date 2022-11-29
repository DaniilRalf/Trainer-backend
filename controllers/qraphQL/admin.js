const {
    Role,
    User,
    Personal,
    Parameter
} = require('../../models/models');

const root = {

    createClient: async ({input}) => {
        const userSearch = await User.findOne({where: {username: input.username}});
        if (userSearch){
            return new Error('Пользователь c таким ником уже существует уже существует');
        };
        const dataUser = {
            username: input.username,
            first_name: input.first_name,
            last_name: input.last_name,
            password: input.password,
        };
        const dataPersonal = {
            gender: input.personal.gender,
            height: input.personal.height,
            birth_day: input.personal.birth_day,
            start_train: input.personal.start_train,
        };
        const userItem = await User.create(dataUser);
        const personalItem = await Personal.create(dataPersonal);
        const searchRole = await Role.findOne({where: {id: input.roleId}});
        await userItem.setPersonal(personalItem);
        await searchRole.addUsers([userItem]);
        return {
            username: input.username,
        }
    },

    getAllClients: async () => {
        return await User.findAll({
            where: {roleId: 1},
            include: [Role, Personal, Parameter]
        });
    },

}
module.exports = root