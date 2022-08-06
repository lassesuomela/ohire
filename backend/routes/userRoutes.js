let express = require('express');

let router = express.Router();

let userController = require('../controllers/userController');

router.get('/user', userController.authenticated);
router.get('/user/profile', userController.profile);

module.exports = router;