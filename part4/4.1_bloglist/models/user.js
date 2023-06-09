const mongoose = require('mongoose');

const options = {
  toJSON: {
    transform: (doc, returnedObj) => {
      returnedObj.id = returnedObj._id.toString();
      delete returnedObj._id;
      delete returnedObj.__v;
      delete returnedObj.passwordHash;
    },
  },
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    name: String,
    passwordHash: {
      type: String,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  options
);

module.exports = mongoose.model('User', userSchema);
