const Todo = require('../models/todo');

const todoController = {
  createTodo: (req, res) => {
    Todo.create({ description: req.body.description, recurring: req.body.recurring }, (err, item) => {
      if (err) return handleError(err);
      return res.json(item);
    });
  },
  findTodo: (req, res) => {
    Todo.findById(req.params.todoId, (err, item) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(item);
    });
  },
  editTodo: (req, res) => {
    Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true }, (err, item) => {
      if (err) return res.status(500).send(err);
      return res.send(item);
    });
  },
  deleteTodo: (req, res) => {
    console.log('entering delete todo');
    Todo.findByIdAndRemove(req.params.todoId, (err, item) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: 'Todo successfully deleted',
        id: item.id,
      };
      return res.status(200).send(response);
    });
  },
};


module.exports = todoController;
