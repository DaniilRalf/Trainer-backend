const jwt = require("jsonwebtoken")
const {User} = require("../models/models")

module.exports = async ( req, res, next) => {
    try {
        if (req.body?.query?.includes('loginUser')) {
            next()
        } else {
            const token = req.headers['authorization'].split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            const userSearch = await User.findOne({where: {username: decodedToken.username}})
            if (userSearch) {
                next();
            } else {
                return res.status(403).json('Пользователь не авторизован')
            }
        }
    } catch (e) {
        return res.status(403).json('Пользователь не авторизован')
    }
}
