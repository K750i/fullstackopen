const mongoose = require('mongoose');

const options = {
  toJSON: {
    transform: (doc, returnedObj) => {
      returnedObj.id = returnedObj._id.toString();
      delete returnedObj._id;
      delete returnedObj.__v;
    },
  },
};

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: String,
    url: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  options
);

module.exports = mongoose.model('Blog', blogSchema);
