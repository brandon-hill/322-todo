const express = require('express')
const router = express.Router()

const choresController = require('../controllers/chores')

router.get('/', choresController.chores_get_all)

router.post('/', choresController.chores_create_chore)

router.get('/:choreId', choresController.chores_get_one)

router.patch('/:choreId', choresController.chores_update_chore)

router.delete('/:choreId')

module.exports = router
