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
		required: true
	},
	location: {
		streetNumber: { type: Number, required: true },
		unitNumber: { type: Number },
		streetName: {type: String, required: true },
		city: {type: String, required: true },
		postalCode: { type: String, required: true },
		province:  {type: String, required: true },
		country: { type: String, required: true },
		coordinates: {
			latitude: { type: String, required: true },
			longitude: { type: String, required: true }
		}
	},
	dietary_restriction: { type: String },
	allergies: [{type: String }]
});

module.exports = mongoose.model('users', User);