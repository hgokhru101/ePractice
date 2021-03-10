const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		fname: {
			type: String,
			
		},
        lname: {
			type: String,
			
		},
        age: {
			type: Number,
			
		},
        img:{
        data: Buffer,
        contentType: String
    },
	},
	{ timestamps: true },
)

const User = mongoose.model('User', userSchema)

module.exports = { User }
