const {
    Role,
    User,
    Personal,
    Parameter,
    Schedule,
    Photo,
} = require('../models/models');

class GetPhotosController {

    async getAvatar(req, res) {
        try {
            const { id } = req.body;
            const PhotoItems = await Photo.findOne({where: {userId: id, type: 1}})
            res.json(PhotoItems);
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async getAllBeforeAfterPhoto(req, res) {
        try {
            const { id } = req.body;
            const PhotosAll = await Photo.findAll({where: {userId: id}})
            res.json(PhotosAll);
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async getItemClientBeforeAfterPhoto(req, res) {
        try {
            const { id } = req.body;
            const PhotoItems = await Photo.findAll({where: {userId: id, type: 2}})
            res.json(PhotoItems);
        } catch (e) {
            res.status(400).json(e)
        }
    }
}
module.exports = new GetPhotosController();
