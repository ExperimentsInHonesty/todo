import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Display from './Display.jsx';
import InputTodo from './InputTodo.jsx';
import './styles/normalize.css';
import './styles/skeleton.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      tempTodoDescription: '',
      tempRecurringStatus: false,
      tempCompletedStatus: false,
      editingToDo: false,
      idOfTodDoBeingEdited: null,
    };
    this.grabTodos = this.grabTodos.bind(this);
    this.inputTodo = this.inputTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.cancelUpdateAndAdd = this.cancelUpdateAndAdd.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.unCompleteTodo = this.unCompleteTodo.bind(this);
  }

  componentDidMount() {
    this.grabTodos();
  }

  inputTodo() {
    const { tempTodoDescription, tempRecurringStatus } = this.state;
    fetch('/todo/', {
      method: 'post',
      body: JSON.stringify({
        description: tempTodoDescription,
        recurring: tempRecurringStatus,
      }),
      headers: { 'content-type': 'application/json' },
    })
      // .then(response => response.json())
      .then(() => this.setState({ tempTodoDescription: '' }))
      .then(() => this.grabTodos());
  }

  // I tried to destructure the handleInputChange function
  //  but had some issues. See the commented out version.
  //  It should work but dosent.


  handleInputChange(event) {
    const {
      checked,
      name,
      type,
    } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
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

  // refactor editTodo to find the element
  // by name not the number it appears in the
  // todo.jsx file div.  It's to prone to bugs from editing.
  editTodo(event) {
    const item = event.target.parentNode.parentNode;
    const getDescription = item.childNodes[0].textContent;
    const getRecurring = item.childNodes[1].textContent === 'yes';
    const id = event.target.name;
    this.setState({
      tempTodoDescription: getDescription,
      tempRecurringStatus: getRecurring,
      editingToDo: true,
      idOfTodDoBeingEdited: id,
    });
  }

  cancelUpdateAndAdd() {
    this.setState({
      tempTodoDescription: '',
      tempRecurringStatus: false,
      tempCompletedStatus: false,
      editingToDo: false,
      idOfTodDoBeingEdited: null,
    });
  }

  updateTodo() {
    const {
      tempTodoDescription,
      idOfTodDoBeingEdited,
      tempRecurringStatus,
    } = this.state;
    fetch(`/todo/${idOfTodDoBeingEdited}`, {
      method: 'put',
      body: JSON.stringify({
        description: tempTodoDescription,
        recurring: tempRecurringStatus,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(() => this.setState({
        tempTodoDescription: '',
        tempRecurringStatus: false,
        tempCompletedStatus: false,
        editingToDo: false,
        idOfTodDoBeingEdited: null,
      }))
      .then(() => this.grabTodos());
  }

  // the completeTodo and unCompleteTodo functions should be refactored into a toggle function.

  completeTodo(event) {
    const id = event.target.name;
    fetch(`/todo/${id}`, {
      method: 'put',
      body: JSON.stringify({
        completed: true,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(() => this.grabTodos());
  }

  unCompleteTodo(event) {
    const id = event.target.name;
    fetch(`/todo/${id}`, {
      method: 'put',
      body: JSON.stringify({
        completed: false,
      }),
      headers: { 'content-type': 'application/json' },
    })
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
    const {
      todos,
      tempTodoDescription,
      tempRecurringStatus,
    } = this.state;
    return (
      <div>
        <p>Todo List</p>
        <InputTodo
        handleInputChange={this.handleInputChange}
        descriptionInState={tempTodoDescription}
        recuringStatusInState={tempRecurringStatus}
        renderButton={this.renderButton}
        cancelUpdateAndAdd={this.cancelUpdateAndAdd}
        />
        <Display
        allTodos={todos}
        deleteTodo={this.deleteTodo}
        editTodo={this.editTodo}
        completeTodo={this.completeTodo}
        unCompleteTodo={this.unCompleteTodo}
        // toggleCompleted={this.toggleCompleted}
        />
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
