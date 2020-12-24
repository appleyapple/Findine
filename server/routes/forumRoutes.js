const express = require('express');
const forumController = require('../controllers/forumController');

const router = express.Router();

// GET request for forum given restaurant name
// using BODY
router.get('/forums', forumController.getForum);

// POST request for adding forum given restaurant name / comments
// using BODY
router.post('/forums/addForum', forumController.addForum);

// POST request for adding restaurant comments given comment list and restaurant name
// using BODY
router.post('/forums/addRestaurantComments', forumController.addRestaurantComments);

// GET request for getting restaurant comments given restaurant name
// using BODY
router.get('/forums/getRestaurantComments', forumController.getRestaurantComments);

// POST request for clearing restaurant comments given restaurant name
// using BODY
router.post('/forums/clearRestaurantComments', forumController.clearRestaurantComments);

module.exports = router;