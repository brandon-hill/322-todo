const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.get('/register', UserController.user_get_register);

router.post('/register', UserController.user_post_register);

router.get('/login', UserController.user_get_login);

router.post('/login', UserController.user_post_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;
