const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')

router.get('/register', UserController.user_get_register)

router.post('/register', UserController.user_post_register)

router.get('/login', UserController.user_get_login)

router.post('/login', UserController.user_post_login)

router.delete('/:userId', UserController.user_delete)

router.get('/logout', UserController.user_logout)

module.exports = router
