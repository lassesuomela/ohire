let express = require('express');

let router = express.Router();

let meetingsController = require('../controllers/meetingsController');

router.get('/meetings', meetingsController.usersMeetings);

module.exports = router;