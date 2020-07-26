const mongoose = require('mongoose')

const Household = require('../models/household')
const User = require('../models/user')
const user = require('../models/user')

exports.households_get_create = (req, res, next) => {
	res.render('create', { user: req.user })
}

exports.households_post_create = (req, res, next) => {
	const household = new Household({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		accessCode: Math.floor(Math.random() * (1000000 - 100000)) + 100000,
		members: [req.user],
	})
	household
		.save()
		.then((result) => {
			User.findById(req.user._id)
				.exec()
				.then((user) => {
					console.log(user)

					if (user.household != '') {
						req.flash(
							'error_msg',
							'You already belong to a different household'
						)
						res.redirect('/')
					}

					// Update user's household id
					user.household = result._id
					user
						.save()
						.then(() => {
							req.flash('success_msg', 'Household created')
							res.render('index', { household: household, user: user })
						})
						.catch((err) => {
							console.log(err)
							req.flash('error_msg', 'Failed to update household')
						})
				})
				.catch((err) => {
					console.log(err)
					req.flash('error_msg', 'Error, try again')
					res.redirect('/')
				})
		})
		.catch((err) => {
			console.log(err)
			req.flash('error_msg', 'Error, try again')
			res.status(500).json({
				err: err,
			})
		})
}

exports.households_join = (req, res, next) => {
	Household.findOne({ accessCode: req.accessCode })
		.execute()
		.then((household) => {
			household.members.push(req.user)
			req.flash('success_msg', 'Successfully joined household')
			res.render('/', {
				household: household,
				user: req.user,
			})
		})
		.catch()
}
