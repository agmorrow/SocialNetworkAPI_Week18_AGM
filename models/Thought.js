const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  username: {
    type: String,
    required: true
  },
  reactions: {
    
  }
})