const { Role, User } = require('../models/models')

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
            await User.create({
                username: 'alina_admin',
                first_name: 'alina_admin',
                last_name: 'alina_admin',
                password: 'alina_admin',
                roleId: 2
            })
        }
    } catch (e) {
        console.warn('No roles')
    }
}