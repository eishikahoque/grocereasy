const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		min: 8
	},
	phone: {
		type: Number,
		required: true,
		unique: true
	},
	shipping: {
		street_num: { type: Number, required: true },
		unit_num: { type: Number },
		street_name: {type: String, required: true },
		city:   {type: String, required: true },
		postal_code: { type: String, required: true },
		province:  {type: String, required: true },
		country: { type: String, required: true }
	},
	dietary_restrictions: [{ type: String }],
	allergies: [{type: String }]
});

module.exports = mongoose.model('users', User);