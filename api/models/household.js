const mongoose = require('mongoose')

const householdSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	members: [],
	chores: [],
	shoppingList: [],
	reminders: [],
	accessCode: { type: Number, required: true },
})

module.exports = mongoose.model('Household', householdSchema)
