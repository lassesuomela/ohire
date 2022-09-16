let express = require('express');

let router = express.Router();

let jobsController = require('../controllers/jobsController');

let cache = require('../configs/cache');

router.get('/jobs/:page', cache.checkCache, jobsController.getNAmountOfPostings);
router.get('/jobs/:page/:filter', cache.checkCache, jobsController.getNAmountOfPostings);
router.get('/job/:id', cache.checkCache, jobsController.getById);

module.exports = router;