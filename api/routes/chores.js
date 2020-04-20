const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const choresController = require('../controllers/chores');

router.get('/', checkAuth, choresController.chores_get_all);

router.post('/', checkAuth, choresController.chores_create_chore);

router.get('/:choreId', checkAuth, choresController.chores_get_one);

router.patch('/:choreId', checkAuth, choresController.chores_update_chore);

router.delete('/:choreId', checkAuth);

module.exports = router;
