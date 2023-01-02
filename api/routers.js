const Router = require('express')
const routers = new Router();
const getPhotosController = require('../controllers/getPhotosController')
const setPhotosController = require('../controllers/setPhotosController')

routers.post('/get_client_photos', getPhotosController.getAllBeforeAfterPhoto)
routers.post('/get_client_item_photos', getPhotosController.getItemClientBeforeAfterPhoto)

routers.post('/set_client_photos', setPhotosController.saveNewPhoto)

module.exports = routers