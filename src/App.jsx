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

  handleInputChange(event) {
    // const target = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }

  // handleInputChange(event) {
  //   const {
  //     checked,
  //     name,
  //     type,
  //     target,
  //   } = event.target;
  //   const value = type === 'checkbox' ? checked : target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

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
    const item = event.target.parentNode.parentNode;
    const getDescription = item.childNodes[1].textContent;
    const getRecurring = item.childNodes[2].textContent === 'yes';
    const getCompleted = item.childNodes[0].textContent === 'yes';
    const id = event.target.name;
    this.setState({
      tempTodoDescription: getDescription,
      tempRecurringStatus: getRecurring,
      tempCompletedStatus: getCompleted,
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

  // completeTodo(event) {
  //   console.log(event.target.name);
  //   (this.setState({
  //     tempCompletedStatus: true,
  //     idOfTodDoBeingEdited: event.target.name,
  //   }));
  //   const {
  //     tempCompletedStatus,
  //     idOfTodDoBeingEdited,
  //   } = this.state;
  //   fetch(`/todo/${idOfTodDoBeingEdited}`, {
  //     method: 'put',
  //     body: JSON.stringify({
  //       completed: tempCompletedStatus,
  //     }),
  //     headers: { 'content-type': 'application/json' },
  //   })
  //     .then(() => this.setState({
  //       // tempTodoDescription: '',
  //       // tempRecurringStatus: false,
  //       tempCompletedStatus: false,
  //       // editingToDo: false,
  //       idOfTodDoBeingEdited: null,
  //     }))
  //     .then(() => this.grabTodos());
  // }

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
        />
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
