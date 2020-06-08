const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_get_register = (req, res, next) => {
	res.render('register');
};

exports.user_post_register = (req, res, next) => {
	console.log(req.body);
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'Email already registered',
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err,
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							username: req.body.username,
							email: req.body.email,
							password: hash,
						});
						user
							.save()
							.then((result) => {
								console.log(result);
								res.status(201).json({
									message: 'User created',
								});
							})
							.catch((err) => {
								console.log(err);
								res.status(500).json({
									error: err,
								});
							});
					}
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

exports.user_get_login = (req, res, next) => {
	res.render('login');
};

exports.user_post_login = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			console.log(req.body.email);
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Authentication failed',
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Authentication failed, incorrect password',
					});
				}
				if (result) {
					const token = jwt.sign(
						{
							email: user[0].email,
							userId: user[0]._id,
						},
						process.env.JWT_KEY,
						{
							expiresIn: '1h',
						}
					);
					res.redirect('/');
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

exports.user_delete = (req, res, next) => {
	User.remove({ _id: req.params.userId })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: 'User deleted',
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
