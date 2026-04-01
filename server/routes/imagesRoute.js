const route = require('express').Router();
const { fetchImage } = require('../controllers/fetchImagesController');

route.get('/', fetchImage);

module.exports = route;