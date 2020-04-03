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
		address: {type: String},
		city:   {type: String},
		province:  {type: String},
		country: { type: String}
	}
});

module.exports = mongoose.model('users', User);