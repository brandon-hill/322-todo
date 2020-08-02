const mongoose = require('mongoose')

const reminderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: true },
	createDate: { type: Date, default: Date.now, required: true },
	scheduled: { type: Date, required: true },
	recurring: { type: Boolean, required: true },
	interval: { type: Number },
	author: { type: String, required: true },
	status: { type: String, required: true },
})

module.exports = mongoose.model('Reminder', reminderSchema)
