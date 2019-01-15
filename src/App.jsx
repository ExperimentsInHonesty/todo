import React from 'react';
import ReactDOM from 'react-dom';
import Display from './Display.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      // isLoading: false,
      // error: null,
    };
  }

  componentDidMount() {
    this.grabTodos();
  }

  grabTodos() {
    fetch('/todo/')
      .then(response => response.json())
      .then(data => this.setState({ todos: data }));
      // .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <p>React here!</p>
        {/* {console.log(this.state.todos)} */}
        {/* {console.log(this.state.isLoading)} */}
        <Display allTodos={todos} />
      </div>
    );
  }
}


export default App;
ReactDOM.render(<App />, document.getElementById('app'));
