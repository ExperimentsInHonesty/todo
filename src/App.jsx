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
  // we need something else that if editingTodo
  // in state is true that it displays Update
  // instead of Add on in the InputTodo.jsx page
  // see InputTodo.jsx for code I tried to use
    const { tempTodoDescription, idOfTodDoBeingEdited } = this.state;
    // const id = event.target.name;
    fetch(`/todo/${idOfTodDoBeingEdited}`, {
      method: 'put',
      body: JSON.stringify({ description: tempTodoDescription }),
      headers: { 'content-type': 'application/json' },
    })
      .then(() => this.setState({ tempTodoDescription: '' }))
      .then(() => this.grabTodos());
  }

  render() {
    const { todos, tempTodoDescription } = this.state;
    return (
      <div>
        <p>React here!</p>
        {/* {console.log(this.state.todos)} */}
        {/* {console.log(this.state.isLoading)} */}
        <InputTodo
        addTodoTolList={this.inputTodo}
        storingInputInState={this.storingTempTodo}
        currentInput={tempTodoDescription}
        updateTodo={this.updateTodo}
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

// App.propTypes = {
//   children: React.PropTypes.node,
// };

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
