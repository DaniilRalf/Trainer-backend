const {Role, User, Personal} = require('../../models/models');
const {Parameter} = require('../../models/models');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const generateAccessToken = (id, role) => {
    //====засунуть SECRET_KEY в енвайромент
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, 'SECRET_KEY', {expiresIn: "24h"})
}

const root = {

    // getAllUsers: async () => {
    //     return await User.findAll({include: [Role]});
    // },
    //
    // getUser: async ({id}) => {
    //     return await User.findOne({where: {id: id}});
    // },

    loginUser: async ({input}) => {
        const userSearch = await User.findOne({where: {username: input.username}});
        if (!userSearch){
            return new Error('Пользовател не найден');
        }
        // const validPassword = bcrypt.compareSync(password, condidate.password);
        // if (!validPassword){
        //     return new Error('Введен не верный пароль');
        // }
        const token = generateAccessToken(userSearch.id, userSearch.roleId);

        return {
            id: userSearch.id,
            username: userSearch.username,
            first_name: userSearch.first_name,
            last_name: userSearch.last_name,
            roleId: userSearch.roleId,
            token: token
        }
    },

    getUserPersonalParameters: async ({username}) => {
        return await User.findOne({
            where: {username: username},
            include: [Personal, Parameter]
        });
    }

}
module.exports = root;