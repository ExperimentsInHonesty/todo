const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const todoController = require('./controllers/todoController');

mongoose.connect('mongodb://bonnie:A123456@ds151814.mlab.com:51814/todo', { useNewUrlParser: true }, console.log('connected - cool'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
app.get('/main.js', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));
app.get('/main.css', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'main.css')));
app.get('/second', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'secondPage.html')));
app.post('/todo', todoController.createTodo);
app.get('/todo', todoController.findTodo);
app.put('/todo', todoController.editTodo);
app.delete('/todo', todoController.deleteTodo);


app.listen(3000);
