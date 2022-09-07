let express = require('express');

let router = express.Router();

let jobsController = require('../controllers/jobsController');

router.post('/jobs', jobsController.create);
router.delete('/jobs/:id', jobsController.deleteById)
router.get('/company/jobs/:page', jobsController.getCompanysPostings);

module.exports = router;