const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

// GET request for list of restaurants
router.get('/restaurants', restaurantController.restaurant_form);

// same as above but with body
router.post('/restaurants', restaurantController.restaurant_body);

// GET request for restaurant by ID
router.get('/restaurants/getRestaurantById', restaurantController.getRestaurantById);

// GET request for restaurant by rest name
// get by body
router.post('/restaurants/getRestaurantByName', restaurantController.getRestaurantByName);

// GET request for list of cuisines
router.get('/restaurants/cuisines', restaurantController.getCuisines);

module.exports = router;
