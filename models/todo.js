const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completed: Boolean,
  recurring: Boolean,
});
const Todo = mongoose.model("Todo", schema);

module.exports = Todo;
