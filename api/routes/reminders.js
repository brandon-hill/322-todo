const express = require('express')
const router = express.Router()

const ReminderController = require('../controllers/reminder')

router.post('/create', ReminderController.create_reminder)

router.patch('/patch', ReminderController.patch_reminder)

module.exports = router
