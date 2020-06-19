const Chore = require('../models/chore')

exports.chores_get_all = (req, res, next) => {
	Chore.find()
		.select('_id name createDate description dueDate author assignee priority')
		.exec()
		.then((docs) => {
			const response = {
				count: docs.length,
				chores: docs.map((doc) => {
					return {
						_id: doc._id,
						name: doc.name,
						createDate: doc.createDate,
						description: doc.description,
						dueDate: doc.dueDate,
						author: doc.author,
						priority: doc.priority,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/chores/' + doc._id,
						},
					}
				}),
			}

			res.render('index')
		})
		.catch((err) => {
			console.log(err)
			res.status(200).json({
				error: err,
			})
		})
}

exports.chores_create_chore = (req, res, next) => {
	const chore = new Chore({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		createDate: new Date(),
		description: req.body.description,
		dueDate: req.body.dueDate,
		author: req.body.author,
		assignee: req.body.assignee,
		priority: req.body.priority,
		status: req.body.status,
	})
	chore
		.save()
		.then((result) => {
			console.log(result)
			res.status(201).json({
				message: 'Successfully created chore',
				createdChore: {
					_id: result._id,
					name: result.name,
					createDate: result.createDate,
					description: result.description,
					dueDate: result.dueDate,
					author: result.author,
					assignee: result.assignee,
					priority: result.priority,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/chores/' + result._id,
					},
				},
			})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ error: err })
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
