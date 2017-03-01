const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

/**
 * Define the schema for users
 * A user with a name, a firstname a role and a creation date.
 */
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  role: {
    type: String,
    required: true,
    enum: [ 'citizen', 'manager' ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.index({ firstName: 1, lastName: 1  }, { unique: true });

// Customize the behavior of user.toJSON() (called when using res.send)
userSchema.set('toJSON', {
  transform: transformJsonUser, // Modify the serialized JSON with a custom function
  virtuals: true // Include virtual properties when serializing documents to JSON
});

/**
 * Removes extra MongoDB properties from serialized people.
 */
function transformJsonUser(doc, json, options) {

  // Remove MongoDB _id & __v (there's a default virtual "id" property)
  delete json._id;
  delete json.__v;

  return json;
}

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);