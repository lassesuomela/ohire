let express = require('express');

let router = express.Router();

let userController = require('../controllers/userController');

const auth = require('../configs/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user', auth, userController.authenticated);

module.exports = router;