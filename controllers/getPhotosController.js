const {
    Role,
    User,
    Personal,
    Parameter,
    Schedule,
    Photo,
} = require('../models/models');

class GetPhotosController {
    async getAllBeforeAfterPhoto(req, res) {
        try {
            const { id } = req.body;
            const PhotosAll = await Photo.findAll({where: {userId: id}})
            res.json(PhotosAll);
        } catch (e) {
            res.status(400).json(e)
        }
    }
}
module.exports = new GetPhotosController();