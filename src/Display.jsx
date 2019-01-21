import React from 'react';
import Todo from './Todo.jsx';

const Display = (props) => {
  // console.log(allTodos);
  console.log(props);
  const todoComponents = props.allTodos.map(todo => (
    <Todo
      name="bonnie"
      completed={todo.completed}
      recurring={todo.recurring}
      description={todo.description}
      id={todo._id}
      deleteTodo = {props.deleteTodo}
    />
  ));

  return (
    <div>
      <table class="blueTable">
        <thead>
          <tr>
            <th>Completed</th>
            <th>Description</th>
            <th>Recurring</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan="4">
              {/* <div className="links"><a href="#">&laquo;</a> <a className="active" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div> */}
            </td>
          </tr>
        </tfoot>
        <tbody>
          {todoComponents}
        </tbody>
      </table>
    </div>
  );
};


export default Display;
