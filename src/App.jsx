import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Display from './Display.jsx';
import InputTodo from './InputTodo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      tempTodoDescription: '',
      editingToDo: false,
      idOfTodDoBeingEdited: null,
    };
    this.grabTodos = this.grabTodos.bind(this);
    this.inputTodo = this.inputTodo.bind(this);
    this.storingTempTodo = this.storingTempTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    this.grabTodos();
  }

  inputTodo() {
    const { tempTodoDescription } = this.state;
    fetch('/todo/', {
      method: 'post',
      body: JSON.stringify({ description: tempTodoDescription }),
      headers: { 'content-type': 'application/json' },
    })
      // .then(response => response.json())
      .then(() => this.setState({ tempTodoDescription: '' }))
      .then(() => this.grabTodos());
  }

  storingTempTodo(event) {
    const tempTodoDescription = event.target.value;
    this.setState({ tempTodoDescription });
    // console.log(tempTodoDescription)
    // setTimeout(()=>console.log(this.state), 1000);
  }

  deleteTodo(event) {
    const id = event.target.name;
    fetch(`/todo/${id}`, {
      method: 'delete',
    })
      .then(() => this.grabTodos());
  }

  grabTodos() {
    fetch('/todo/')
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
  }

  editTodo(event) {
    // fetch description and other details by id
    // set tempTodoDescription in state to fetched item description
    // set editingTodo in state to true
    const id = event.target.name;
    fetch(`/todo/${id}`, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => this.setState({
        tempTodoDescription: data.description,
        editingToDo: true,
        idOfTodDoBeingEdited: id,
      }));
  }

  updateTodo() {
    const { tempTodoDescription, idOfTodDoBeingEdited } = this.state;
    fetch(`/todo/${idOfTodDoBeingEdited}`, {
      method: 'put',
      body: JSON.stringify({ description: tempTodoDescription }),
      headers: { 'content-type': 'application/json' },
    })
      .then(() => this.setState({ tempTodoDescription: '', editingToDo: false }))
      .then(() => this.grabTodos());
  }

  renderButton() {
    if (this.state.editingToDo) {
      return (
        <button type="button" onClick={this.updateTodo}>Update</button>
      );
    }
    return (
        <button type="button" onClick={this.inputTodo}>Add</button>
    );
  }

  render() {
    const { todos, tempTodoDescription } = this.state;
    return (
      <div>
        <p>Put text here</p>
        <InputTodo
        storingInputInState={this.storingTempTodo}
        currentInput={tempTodoDescription}
        renderButton={this.renderButton}
        />
        <Display
        allTodos={todos}
        deleteTodo={this.deleteTodo}
        editTodo={this.editTodo}
        />
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
