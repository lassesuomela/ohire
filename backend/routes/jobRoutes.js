let express = require('express');

let router = express.Router();

let jobsController = require('../controllers/jobsController');

router.post('/jobs', jobsController.create);

module.exports = router;