const { Role, User } = require('../models/models')
const bcrypt = require("bcryptjs");

module.exports = async () => {
    const roleUser = await Role.findOne({where: {value: 'USER'}})
    const roleAdmin = await Role.findOne({where: {value: 'ADMIN'}})
    const admin = await User.findOne({where: {username: 'alina_admin'}})
    try {
        if (!roleUser) {
            await Role.create({value: 'USER'})
        }
        if (!roleAdmin) {
            await Role.create({value: 'ADMIN'})
        }
        if (!admin) {
            const hashPassword = await bcrypt.hash('alina_admin', 5)
            await User.create({
                username: 'alina_admin',
                first_name: 'alina_admin',
                last_name: 'alina_admin',
                password: hashPassword,
                roleId: 2
            })
        }
    } catch (e) {
        console.warn('No roles')
    }
}
