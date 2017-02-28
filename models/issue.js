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
		validate: : {
			validator: validateStatus
		}
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
	    validate: {
	      // Validate that the user is a valid ObjectId
	      // and references an existing user
	      validator: validateUser
	    }
	},
	createDate: {
		type: Date,
    	default: Date.now
	},
	updateDate: {
		type: Date
	}
});

/**
 * Add a virtual "userHref" property:
 *
 * * "issue.userHref" will return the result of calling getUserHref with the issue as this
 * * "issue.userHref = value" will return the result of calling setUserHref with the issue as this and value as an argument
 */
issueSchema.virtual('userHref').get(getUserHref).set(setUserHref);

// Customize the behavior of issue.toJSON() (called when using res.send)
issueSchema.set('toJSON', {
  transform: transformJsonIssue, // Modify the serialized JSON with a custom function
  virtuals: true // Include virtual properties when serializing documents to JSON
});

/**
 * Given a user ID, ensures that it references an existing user.
 *
 * If it's not the case or the ID is missing or not a valid object ID,
 * the "userHref" property is invalidated instead of "user ".
 * (That way, the client gets an error on "userHref", which is the
 * property they sent, rather than "user", which they don't know.)
 */
function validateUser(value, callback) {
	if (!value && !this.userHref) {
		this.invalidate('userHref', 'Path `userHref` is required', value, 'required');
		return callback();
	} else if (!ObjectId.isValid(value)) {
	this.invalidate('userHref', 'Path `userHref` is not a valid User reference', this._userHref, 'resourceNotFound');
	return callback();
	}

	mongoose.model('User').findOne({ _id: ObjectId(value) }).exec(function(err, user) {
	if (err || !user) {
		this.invalidate('userHref', 'Path `userHref` does not reference a User that exists', this._userHref, 'resourceNotFound');
	}

	callback();
	});
}

/**
 * Returns the hyperlink to the movie's user.
 * (If the user has been populated, the _id will be extracted from it.)
 */
function getUserHref() {
  return `/api/user/${this.user._id || this.user}`;
}

/**
 * Sets the movie's user from a person hyperlink.
 */
function setUserHref(value) {

  // Store the original hyperlink 
  this._userHref = value;

  // Remove "/api/user/" from the beginning of the value
  const userId = value.replace(/^\/api\/user\//, '');

  if (ObjectId.isValid(userId)) {
    // Set the user if the value is a valid MongoDB ObjectId
    this.user = userId;
  } else {
    // Unset the user otherwise
    this.user = null;
  }
}

/**
 * Removes extra MongoDB properties from serialized movies,
 * and includes the user's data if it has been populated.
 */
function transformJsonIssue(doc, json, options) {

  // Remove MongoDB _id & __v (there's a default virtual "id" property)
  delete json._id;
  delete json.__v;

  if (json.user instanceof ObjectId) {
    // Remove the user property by default (there's a "userHref" virtual property)
    delete json.user;
  } else {
    // If the user was populated, include it in the serialization
    json.user = doc.user.toJSON();
  }

  return json;
}


function validateStatus(value, callback){

}

module.exports = mongoose.model('Issue', issueSchema);