let express = require('express');

let router = express.Router();

let jobsController = require('../controllers/jobsController');

router.post('/jobs', jobsController.create);
router.get('/jobs/:page', jobsController.getNAmountOfPostings);
router.get('/job/:id', jobsController.getById);

module.exports = router;