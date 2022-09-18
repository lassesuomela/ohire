let express = require('express');

let router = express.Router();

let userController = require('../controllers/userController');

router.get('/user', userController.authenticated);
router.get('/user/profile', userController.profile);
router.post('/user/profile', userController.profileUpdate);
router.get('/user/profile/picture', userController.profilePic);

module.exports = router;