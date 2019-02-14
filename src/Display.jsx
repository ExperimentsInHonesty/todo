import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo.jsx';


const Display = ({
  deleteTodo,
  editTodo,
  allTodos,
  completeTodo,
  unCompleteTodo,
}) => {
  const notCompleted = allTodos.filter(todo => !todo.completed);
  const todoComponents = notCompleted.map(todo => (
    <Todo
      key={todo._id}
      // completed={todo.completed}
      recurring={todo.recurring}
      description={todo.description}
      id={todo._id}
      completed={todo.completed}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
      completeTodo={completeTodo}
      unCompleteTodo={unCompleteTodo}
    />
  ));

  const completed = allTodos.filter(todo => todo.completed);
  const todoComponentsCompleted = completed.map(todo => (
    <Todo
      key={todo._id}
      // completed={todo.completed}
      recurring={todo.recurring}
      description={todo.description}
      completed={todo.completed}
      id={todo._id}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
      completeTodo={completeTodo}
      unCompleteTodo={unCompleteTodo}
    />
  ));

  todoComponents.propTypes = {
    completed: PropTypes.bool,
    recurring: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number,
  };
  todoComponentsCompleted.propTypes = {
    completed: PropTypes.bool,
    recurring: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number,
  };

  Display.propTypes = {
    deleteTodo: PropTypes.function,
    editTodo: PropTypes.function,
    completeTodo: PropTypes.function,
    unCompleteTodo: PropTypes.function,
    allTodos: PropTypes.array,
  };

  return (
    <div>
      <table className="blueTable" width="100%">
        <thead>
          <tr>
            {/* <th>Current Todo&apos;s</th> */}
            <th>description</th>
            <th>recurring</th>
            <th>delete</th>
            <th>edit</th>
            <th>Completed</th>

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
      <table className="blueTable" width="100%">
        <thead>
          <tr>
            <th>Completed Todo&apos;s</th>
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
          {todoComponentsCompleted}
        </tbody>
      </table>
    </div>
  );
};


export default Display;
