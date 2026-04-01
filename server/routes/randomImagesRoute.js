const { fetchRandom } = require('../controllers/randomImagesController');
const route = require('express').Router();

route.get('/', fetchRandom);

module.exports = route;