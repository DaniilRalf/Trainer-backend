const {
    User,
    Photo, Feed
} = require('../models/models');
const uuid = require('uuid');
const path = require('path');


class SetPhotosController {

    async saveNewAvatar(req, res) {
        try {
            const {date, id} = req.body;
            const {img} = req.files;
            const userSearch = await User.findOne({where: {id: id}})
            if (!userSearch) {
                res.status(400).json('Данного пользователя не существует')
                return
            }

            const photoName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', photoName))

            const [feed, created] = await Photo.findOrCreate(
                {
                    where: {userId: id, type: 1,},
                    defaults: {
                        file_name: photoName,
                        date: String(date),
                        type: 1,
                    }
                }
            )
            if (!created) {
                feed.set({
                    file_name: photoName,
                    date: String(date),
                })
                await feed.save()
            }
            res.json({id})
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async saveNewPhoto(req, res) {
        try {
            const {date, id, angle} = req.body;
            const {img} = req.files;
            const userSearch = await User.findOne({where: {id: id}})
            if (!userSearch) {
                res.status(400).json('Данного пользователя не существует')
                return
            }
            const photoName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', photoName))
            const photoItem = await Photo.create({
                file_name: photoName,
                date: String(date),
                type: 2,
                angle: angle,
            })
            await userSearch.addPhotos([photoItem]);
            res.json(photoItem)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async removePhotosGroup(req, res) {
        try {
            const removePhotoIDArray = req.body

            for (const itemId of removePhotoIDArray) {
                const photoItem = await Photo.findOne({where: {id: itemId}})
                if (!photoItem) continue
                await photoItem.destroy({where: {id: itemId}})
            }
            res.json('Фото удалены')
        } catch (e) {
            res.status(400).json(e)
        }
    }

}

module.exports = new SetPhotosController();
