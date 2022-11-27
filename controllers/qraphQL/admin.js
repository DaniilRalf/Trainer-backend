const {Role, User} = require('../../models/models');

const root = {

    // getTest2: async () => {
    //     return await User.findAll({include: [Role]});
    // },

    createClient: async ({input}) => {
        console.log(input)
        return input;
    }


}
module.exports = root;