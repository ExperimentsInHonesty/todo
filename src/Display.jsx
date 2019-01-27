import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo.jsx';


const Display = ({
  deleteTodo,
  editTodo,
  allTodos,
  completeTodo,
}) => {
  const todoComponents = allTodos.map(todo => (
    <Todo
      key={todo._id}
      completed={todo.completed}
      recurring={todo.recurring}
      description={todo.description}
      id={todo._id}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
      completeTodo={completeTodo}
    />
  ));

  const todoComponentCompleted = allTodos.map(todo => (
    <Todo
      key={todo._id}
      completed={todo.completed}
      recurring={todo.recurring}
      description={todo.description}
      id={todo._id}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
      completeTodo={completeTodo}
    />
  ));

  todoComponents.propTypes = {
    completed: PropTypes.bool,
    recurring: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number,
  };

  Display.propTypes = {
    deleteTodo: PropTypes.function,
    editTodo: PropTypes.function,
    completeTodo: PropTypes.function,
    allTodos: PropTypes.array,
  };

  return (
    <div>
      <table className="blueTable">
        <thead>
          <tr>
            <th>Completed</th>
            <th>Description</th>
            <th>Recurring</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan="4">
              {/* <div className="links"><a href="#">&laquo;</a>
            <a className="active" href="#">1</a> <a href="#">2</a>
            <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div> */}
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
