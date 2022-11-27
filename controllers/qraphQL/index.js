const user = require('./user')
const admin = require('./admin')
const client = require('./client')


let root = Object.assign(user, admin, client);
module.exports = root;