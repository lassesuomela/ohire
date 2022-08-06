let express = require('express');

let router = express.Router();

let applicationController = require('../controllers/applicationController');

router.post('/application', applicationController.sendApplication);

module.exports = router;