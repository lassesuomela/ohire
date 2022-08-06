let express = require('express');

let router = express.Router();

let applicationController = require('../controllers/applicationController');

router.post('/application', applicationController.sendApplication);
router.get('/application', applicationController.getUsersApplications);
router.get('/application/job/:id', applicationController.getApplicationsByJobId);
router.get('/application/application/:id/:jobId', applicationController.getApplicationById);

module.exports = router;