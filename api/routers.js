const Router = require('express')
const routers = new Router();
const getPhotosController = require('../controllers/getPhotosController')
const setPhotosController = require('../controllers/setPhotosController')

routers.post('/get_client_photos', getPhotosController.getAllBeforeAfterPhoto)
routers.post('/get_client_item_photos', getPhotosController.getItemClientBeforeAfterPhoto)
routers.post('/set_client_photos', setPhotosController.saveNewPhoto)
routers.post('/remove_client_photos_group', setPhotosController.removePhotosGroup)

routers.post('/set_avatar', setPhotosController.saveNewAvatar)
routers.post('/get_avatar', getPhotosController.getAvatar)

module.exports = routers
