const mongoose = require('mongoose')

const Household = require('../models/household')
const User = require('../models/user')

exports.households_get_create = (req, res, next) => {
	res.render('create', { user: req.user })
}

exports.households_post_create = (req, res, next) => {
	const household = new Household({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		accessCode: Math.floor(Math.random() * (1000000 - 100000)) + 100000,
		members: [req.user._id],
	})
	household
		.save()
		.then((result) => {
			User.findById(req.user._id)
				.exec()
				.then((user) => {
					console.log(user)

					if (user.group != '') {
						req.flash('error_msg', 'User already belongs to a different group')
						res.redirect('/')
					}

					// Update user's group id
					user.group = result._id
					user
						.save()
						.then(() => {
							req.flash('success_msg', 'Household created')
							res.render('/', { household: household })
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
