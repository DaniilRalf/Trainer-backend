const {Role, User} = require('../../models/models');

const root = {

    getTest2: async () => {
        return await User.findAll({include: [Role]});
    },


}
module.exports = root;