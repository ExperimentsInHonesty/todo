const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  recurring: Boolean,
});
const Todo = mongoose.model('Todo', schema);

module.exports = Todo;
