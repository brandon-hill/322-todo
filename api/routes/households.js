const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

const householdsController = require('../controllers/households')

router.get(
	'/create',
	ensureAuthenticated,
	householdsController.households_get_create
)

router.post(
	'/create',
	ensureAuthenticated,
	householdsController.households_post_create
)

router.put('/join', ensureAuthenticated, householdsController.households_join)

module.exports = router
