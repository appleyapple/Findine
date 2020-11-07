// routes for all the URLs needed by the webapp, which will call the controller functions

var express = require('express');
var router = express.Router();

// import  controller modules
var restaurantController = require('../controllers/restaurantController');
var cuisineController = require('../controllers/cuisineController');

// restaurant routes

// GET catalog web page
router.get('/', restaurantController.index);

// GET request for list of all restaurants
router.get('/list', restaurantController.restaurant_list);

// cuisine routes

// GET request for lsit of all cuisines
router.get('/cuisines', cuisineController.cuisine_list);

module.exports = router;
