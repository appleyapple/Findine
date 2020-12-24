const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

// GET request for current session userName
router.get('/sessions', sessionController.getSession);

// POST request for updating session
router.post('/sessions/setSession', sessionController.setSession);

// POST request for clear session
router.post('/sessions/clearSession', sessionController.clearSession);

module.exports = router;
