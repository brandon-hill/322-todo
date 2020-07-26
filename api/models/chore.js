const mongoose = require('mongoose')

const choreSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: true },
	description: { type: String, required: true },
	createDate: { type: Date, default: Date.now, required: true },
	dueDate: { type: Date, required: true },
	author: { type: String, required: true },
	assignee: String,
	household: mongoose.Schema.Types.ObjectId,
	status: { type: String, required: true },
	completionDate: { type: Date },
})

module.exports = mongoose.model('Chore', choreSchema)
