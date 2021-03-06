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
		enum: ['new','inProgress','completed','canceled'],
		default: "new"
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
	tags: [{
		type: String
	}],
	user: {
		type: Schema.Types.ObjectId,
	    ref: 'User',
	    default: null,
	    required: true
	},
	createdAt: {
		type: Date,
    	default: Date.now
	},
	updatedAt: {
		type: Date
	}
});

module.exports = mongoose.model('Issue', issueSchema);
