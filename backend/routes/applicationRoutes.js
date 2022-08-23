let express = require('express');

let router = express.Router();

let applicationController = require('../controllers/applicationController');

router.post('/application', applicationController.sendApplication);
router.get('/application', applicationController.getUsersApplications);
router.get('/application/job/:id', applicationController.getApplicationsByJobId);
router.get('/application/:jobId/:id', applicationController.getApplicationById);
router.post('/application/:jobId/:id', applicationController.reviewApplication);

module.exports = router;