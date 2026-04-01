const { downloadController } = require('../controllers/downloadController');
const route = require('express').Router();

route.get('/:photoId', downloadController);

module.exports = route;