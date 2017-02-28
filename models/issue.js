const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

/* 
	Un problème dans la ville
*/
const issueSchema = new Schema ({
	status: {
		type: String,
		required: true,
		enum: ['New','inProgress','completed','canceled']
	},
	description: {
		type: String,
		required: false,
		maxlenght: 1000
	},
	imageUrl: {
		type: String,
		required: false,
		maxlenght: 500
	},
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	},
	tags: {
		type: Array,
	},
	user: {
		type: Schema.Types.ObjectId,
	    ref: 'User',
	    default: null,
	    validate: {
	      // Validate that the director is a valid ObjectId
	      // and references an existing person
	      validator: validateUser
	    }
	},
	createdAt: {
		type: Date,
    	default: Date.now
	},
	updatedAt: {
		type: Date

	}
});