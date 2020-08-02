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
			res.redirect('/')
		})
}

exports.households_join = (req, res, next) => {
	// Match access code to existing household
	Household.findOne({ accessCode: req.body.accessCode })
		.exec()
		.then((household) => {
			// Add user to household members list
			household.members.push(req.user)

			household
				.save()
				.then(
					// Add household
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
							user.household = household._id
							user
								.save()
								.then(() => {
									req.flash('success_msg', `You joined ${household.name}`)
									res.render('index', { household: household, user: user })
								})
								.catch((err) => {
									console.log(err)
									req.flash('error_msg', 'Failed to update household')
									res.redirect('/')
								})
						})
						.catch((err) => {
							console.log(err)
							req.flash('error_msg', 'Error, try again')
							res.redirect('/')
						})
				)
				.catch((err) => {
					console.log(err)
					req.flash('error_msg', "You're unable to join this household")
				})
		})
		.catch((err) => {
			console.log(err)
			req.flash('error_msg', 'Invalid access code')
			res.redirect('/')
		})
}
