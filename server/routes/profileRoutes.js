const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// POST request for add profile
// using BODY
router.post("/profiles", profileController.addProfile);

// GET request for get profile
// using query
router.get('/profiles', profileController.getProfile);

// POST request to update ready to value for user
// using query
// http://localhost:9000/test/profiles/updateReady?userName=gg&ready=false
router.post('/profiles/updateReady', profileController.updateProfileReady);

// GET request to update ready for user
// using query
router.get('/profiles/getReady', profileController.getProfileReady);

// GET request to get like restaurants list for user
// using query
router.get('/profiles/getLikeRestaurants', profileController.getLikeRestaurants);

// POST request to update like restaurants list for user
// using body
router.post('/profiles/addLikeRestaurants', profileController.addLikeRestaurants);

// POST request to drop list of restaurants from user
router.post('/profiles/clearLikeRestaurants', profileController.clearLikeRestaurants);

// GET request to get partnerName given userName
// using query
router.get('/profiles/getPartnerName', profileController.getPartnerName);

// GET request to get Preferences list for user
// using query
router.get('/profiles/getPreferences', profileController.getPreferences);

// POST request to update Preferences list for user
// using body
router.post('/profiles/addPreferences', profileController.addPreferences);

// POST request to drop list of Preferences from user
router.post('/profiles/clearPreferences', profileController.clearPreferences);

module.exports = router;
