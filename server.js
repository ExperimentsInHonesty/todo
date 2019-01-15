const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoController = require('./controllers/todoController');

const jsonParser = bodyParser.json();


mongoose.connect('mongodb://bonnie:A123456@ds151814.mlab.com:51814/todo', { useNewUrlParser: true }, console.log('connected - cool'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('/main.js', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));
app.get('/main.css', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'main.css')));
app.get('/second', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'secondPage.html')));
app.post('/todo', jsonParser, todoController.createTodo);
app.get('/todo/:todoId', todoController.findTodo);
app.put('/todo/:todoId', jsonParser, todoController.editTodo);
app.delete('/todo/:todoId', todoController.deleteTodo);
app.get('/todo/', todoController.findAllTodos);


app.listen(3000);
