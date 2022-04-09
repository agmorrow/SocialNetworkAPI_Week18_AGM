const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: [true, 'Username is required and must be a minimum of 4 and maximum of 8 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
			// actual value for email that the user is providing
			validator: function(value) {
				return isEmail(value);
			},
      message: function(userObject) {
				return `${userObject.email} is not a valid email address`;
			},
		}
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    },
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ]
});

const User = model('Users', userSchema);

module.exports = User;