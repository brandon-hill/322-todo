const mongoose = require('mongoose')

const choreSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	description: { type: String, required: true },
	createDate: { type: Date, default: Date.now, required: true },
	dueDate: { type: Date, required: true },
	author: { type: String, required: true },
	priority: { type: String, required: true },
	status: { type: String, required: true },
	completionDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Chore', choreSchema)
