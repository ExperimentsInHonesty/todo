const Todo = require('../models/todo');

const todoController = {
  createTodo: (req, res) => {
    // console.log(req.body)
    const { description, recurring } = req.body;
    Todo.create({ description, recurring }, (err, item) => {
      if (err) return res.status(500).send(err);
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
    Todo.findByIdAndDelete(req.params.todoId, (err, item) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: 'Todo successfully deleted',
        id: item.id,
      };
      return res.status(200).send(response);
    });
  },
  findAllTodos: (req, res) => {
    Todo.find({}, (err, items) => {
      if (err) return res.status(500).send(err);
      return res.send(items);
    });
  },
};


module.exports = todoController;
