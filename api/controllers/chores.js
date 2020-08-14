const mongoose = require('mongoose')

const Chore = require('../models/chore')
const User = require('../models/user')
const Household = require('../models/household')

// Instantiate current date
let today = new Date()

exports.chores_get_all = (req, res, next) => {
	// Retrieve household info if user has one
	if (req.user.household != '') {
		Household.findOne({ _id: req.user.household })
			.exec()
			.then((household) => {
				console.log('Household:' + household)

				// Render template
				res.render('index', {
					user: req.user,
					household: household,
					today: today,
				})
			})
			.catch((err) => {
				console.log(err)
				req.flash('error_msg', 'Unable to find household')
				res.redirect('/')
			})
	} else {
		res.render('index', { user: req.user })
	}
}

exports.chores_create_chore = (req, res, next) => {
	// Create and save chore
	const chore = new Chore({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		createDate: new Date(),
		description: req.body.description,
		dueDate: req.body.dueDate,
		author: req.user.username,
		household: req.user.household,
		assignee: req.body.assignee,
		priority: req.body.priority,
		status: 'incomplete',
	})
	chore
		.save()
		.then((result) => {
			console.log(result)

			// Push chore to chore list and save, then redirect
			Household.findOne({ _id: req.user.household })
				.exec()
				.then((household) => {
					household.chores.push(result)

					household
						.save()
						.then((result) => {
							console.log(`Updated Chore List: ${result.chores}`)
						})
						.catch((err) => {
							console.log(err)
							req.flash('error_msg', 'Unable to add chore to household')
							res.render('index', {
								user: req.user,
								household: result,
								today: today,
							})
						})
				})
				.catch((err) => {
					console.log(err)
					req.flash('error_msg', 'Unable to add chore to household')
					res.redirect('/')
				})
			req.flash('success_msg', 'Chore created')
			res.redirect('/')
		})
		.catch((err) => {
			console.log(err)
			req.flash('error_msg', 'Unable to create chore')
			res.redirect('/')
		})
}

exports.chores_get_one = (req, res, next) => {
	const id = req.params.choreId
	Chore.findById(id)
		.select('_id name createDate description dueDate author assignee priority')
		.exec()
		.then((doc) => {
			console.log('From database', doc)
			if (doc) {
				res.status(200).json({
					chore: doc,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/chores/' + doc._id,
					},
				})
			} else {
				res.status(404).json({ message: 'No valid entry found' })
			}
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ error: err })
		})
}

exports.chores_update_chore = (req, res, next) => {
	const id = req.params.choreId
	const updateOps = {}
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}
	Chore.update({ _id: id }, { $set: updateOps })
		.exec()
		.then((result) => {
			console.log(result)
			res.status(200).json({
				message: 'Chore updated',
				request: {
					type: 'GET',
					url: 'http://localhost:3000/chores/' + id,
				},
			})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}

exports.chores_delete_chore = (req, res, next) => {
	const id = req.params.choreId
	Chore.remove({ _id: id })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: 'Successfully deleted chore',
				deletedChore: {
					_id: result._id,
					name: result.name,
					createDate: result.createDate,
					description: result.description,
					dueDate: result.dueDate,
					author: result.author,
					assignee: result.assignee,
					priority: result.priority,
					request: {
						type: 'POST',
						url: 'http://localhost:3000/chores/',
					},
				},
			})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err,
			})
		})
}
