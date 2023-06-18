const {User, Personal, Schedule} = require('../../models/models')
const {Parameter} = require('../../models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {GraphQLError} = require("graphql/error");


const generateAccessToken = (id, role, username) => {
    const payload = {
        id,
        role,
        username
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"})
}

const root = {

    loginUser: async ({input}) => {
        const userSearch = await User.findOne({where: {username: input.username}});
        if (!userSearch) {
            throw new GraphQLError('Пользователь не найден', {
                extensions: {code: 500}
            });
        }
        const validPassword = bcrypt.compareSync(
            input.password,
            userSearch.password,
        )
        if (!validPassword) {
            throw new GraphQLError('Введен неверный пароль', {
                extensions: {code: 500}
            });
        }
        const token = generateAccessToken(userSearch.id, userSearch.roleId, userSearch.username);

        return {
            id: userSearch.id,
            username: userSearch.username,
            first_name: userSearch.first_name,
            last_name: userSearch.last_name,
            roleId: userSearch.roleId,
            is_active: userSearch.is_active,
            token: token
        }
    },

    getUserPersonalParameters: async ({username}) => {
        return await User.findOne({
            where: {username: username},
            include: [Personal, Parameter, Schedule]
        });
    }

}
module.exports = root;
