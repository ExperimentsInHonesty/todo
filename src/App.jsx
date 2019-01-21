import React from 'react';
import ReactDOM from 'react-dom';
import Display from './Display.jsx';
import InputTodo from './InputTodo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      tempTodoDescription: '',
    };
    this.grabTodos = this.grabTodos.bind(this);
    this.inputTodo = this.inputTodo.bind(this);
    this.storingTempTodo = this.storingTempTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    this.grabTodos();
  }

  inputTodo() {
    const todoDescription = this.state.tempTodoDescription;
    fetch('/todo/', {
      method: 'post',
      body: JSON.stringify({ description: todoDescription }),
      headers: { 'content-type': 'application/json' },
    })
      // .then(response => response.json())
      .then(() => this.grabTodos());
  }

  storingTempTodo(event) {
    const tempTodoDescription = event.target.value;
    this.setState({ tempTodoDescription });
    // setTimeout(()=>console.log(this.state), 1000);
  }

  deleteTodo(event) {
    const id = event.target.name;
    fetch('/todo/'+id, {
      method: 'delete',
    })
      .then(() => this.grabTodos());
  }

  grabTodos() {
    fetch('/todo/')
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <p>React here!</p>
        {/* {console.log(this.state.todos)} */}
        {/* {console.log(this.state.isLoading)} */}
        <InputTodo addTodoTolList={this.inputTodo} storingInputInState={this.storingTempTodo}/>
        <Display allTodos={todos} deleteTodo={this.deleteTodo}/>
      </div>
    );
  }
}


export default App;
ReactDOM.render(<App />, document.getElementById('app'));
