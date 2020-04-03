const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	shipping: {
		street_num: { type: Number, required: true },
		unit_num: { type: Number },
		street_name: {type: String, required: true },
		city:   {type: String, required: true },
		postal_code: { type: String, required: true },
		province:  {type: String, required: true },
		country: { type: String, required: true }
	}
});

module.exports = mongoose.model('users', User);