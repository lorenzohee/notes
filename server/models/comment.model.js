const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  comment_id: {
    type: String
  },
  parent_id: {
    type: String
  },
  parent_type: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
    versionKey: false
  });


module.exports = mongoose.model('Comment', CommentSchema);
