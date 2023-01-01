const {
    User,
    Photo
} = require('../models/models');
const uuid = require('uuid');
const path = require('path');


class SetPhotosController {
    async saveNewPhoto(req, res) {
        try {
            const { date, id } = req.body;
            const { img } = req.files;
            const userSearch = await  User.findOne({where: {id: id}})
            if (!userSearch){
                res.status(400).json('Данного пользователя не существует')
                return
            }
            const photoName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', photoName))
            const photoItem = await Photo.create({
                file_name: photoName,
                date: String(date),
                type: 2,
            })
            await userSearch.addPhotos([photoItem]);
            res.json(photoItem)
        } catch (e) {
            res.status(400).json(e)
        }
    }
}
module.exports = new SetPhotosController();