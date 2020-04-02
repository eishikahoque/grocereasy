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
		type: String,
		required: true
	},
	shipping: {
		shipping_address: {type: String, required: true},
		shipping_city:   {type: String, required: true},
		shipping_province:  {type: String, required: true},
		shipping_country: { type: String, required: true}
	},
	billing: {
		billing_address: {type: String},
		billing_city:   {type: String},
		billing_province:  {type: String},
		billing_country: { type: String}
	}
});

module.exports = mongoose.model('users', User);