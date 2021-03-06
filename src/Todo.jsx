import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  recurring,
  completed,
  description,
  id,
  deleteTodo,
  editTodo,
  completeTodo,
  unCompleteTodo,
  // toggleCompleted,

}) => {
  let recurringDisplayText = 'non-recurring';
  let completeButtonRender = <button type="button" name={id} onClick={completeTodo}>Mark Completed</button>;
  if (recurring) { recurringDisplayText = 'recurring'; }
  if (completed) { completeButtonRender = <button type="button" name={id} onClick={unCompleteTodo}>Mark Un Completed</button>; }
  return (
      <tr key={id}>
        {/* <td>{completedDisplayText}</td> */}
        <td width="100px">{description}</td>
        <td width="100px">{recurringDisplayText}</td>
        <td><button type="button" name={id} onClick={deleteTodo}>Delete</button></td>
        <td><button type="button" name={id} onClick={editTodo}>Edit</button></td>
        <td>{completeButtonRender}</td>
      </tr>
  );
};

Todo.propTypes = {
  completed: PropTypes.bool,
  recurring: PropTypes.bool,
  description: PropTypes.string,
  id: PropTypes.number,
  deleteTodo: PropTypes.function,
  editTodo: PropTypes.function,
  completeTodo: PropTypes.function,
  unCompleteTodo: PropTypes.function,
};


export default Todo;
