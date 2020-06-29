const mongoose = require('mongoose')

const Household = require('../models/household')
exports.households_get_create = (req, res, next) => {
	res.render('create', { user: req.user })
}

exports.households_post_create = (req, res, next) => {
	res.send('posted')
}
