const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

// POST request for add profile
// using BODY
router.post("/matches/addMatches", matchController.addMatch);

// GET request for get profile
// using query
router.get('/matches', matchController.getMatch);

// GET request to GET like restaurants list for user
// using query
router.get('/matches/getMatchedRestaurants', matchController.getMatchedRestaurants);

// POST request to update like restaurants list for user
// using body
router.post('/matches/addMatchedRestaurants', matchController.addMatchedRestaurants);

// POST request to drop list of restaurants from user
router.post('/matches/clearMatchedRestaurants', matchController.clearMatchedRestaurants);

// GET request to get partnerName given userName 1
// using query
router.get('/matches/getPartnerName', matchController.getPartnerName);

// POST request to set partnerName given userName 1
// using query
router.post('/matches/setPartnerName', matchController.setPartnerName);

module.exports = router;
