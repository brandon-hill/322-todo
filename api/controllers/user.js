const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')

const User = require('../models/user')

// Register page
exports.user_get_register = (req, res, next) => {
	res.render('register')
}

// Register handler
exports.user_post_register = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'Email already registered',
				})
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						})
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							username: req.body.username,
							email: req.body.email,
							password: hash,
						})
						user
							.save()
							.then((result) => {
								console.log(result)
								req.flash('success_msg', 'Registration Successful')
								res.redirect('/user/login')
							})
							.catch((err) => {
								console.log(err)
								res.status(500).json({
									error: err,
								})
							})
					}
				})
			}
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}

// Login page
exports.user_get_login = (req, res, next) => {
	res.render('login')
}

// Login handler
exports.user_post_login = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/user/login',
		failureFlash: true,
	})(req, res, next)
}

// Logout handler
exports.user_logout = (req, res) => {
	req.logout()
	req.flash('success_msg', 'Successfully Logged Out')
	res.redirect('/login')
}

// Delete account
exports.user_delete = (req, res, next) => {
	User.remove({ _id: req.params.userId })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: 'User deleted',
			})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}
