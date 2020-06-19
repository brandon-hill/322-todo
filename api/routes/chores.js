const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

const choresController = require('../controllers/chores')

router.get('/', ensureAuthenticated, choresController.chores_get_all)

router.post('/', ensureAuthenticated, choresController.chores_create_chore)

router.get('/:choreId', ensureAuthenticated, choresController.chores_get_one)

router.patch(
	'/:choreId',
	ensureAuthenticated,
	choresController.chores_update_chore
)

router.delete(
	'/:choreId',
	ensureAuthenticated,
	choresController.chores_delete_chore
)

module.exports = router
