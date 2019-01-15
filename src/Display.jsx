import React from 'react';
import Todo from './Todo.jsx';

const Display = (props) => {
  // console.log(allTodos);
  console.log(props.allTodos);
  const todoComponents = props.allTodos.map(todo => (
    <Todo
      name="bonnie"
      completed={todo.completed}
      recurring={todo.recurring}
      description={todo.description}
      id={todo._id}
    />
  ));

  return (
    <div>
      {todoComponents}
    </div>
  );
};


export default Display;
