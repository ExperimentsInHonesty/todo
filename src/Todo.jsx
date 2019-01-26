import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  recurring,
  completed,
  description,
  id,
  deleteTodo,
  editTodo,
  // tempTodoDescription,
}) => {
  // const recurring = props.recurring
  // const {recurring, completed} = props
  let recurringDisplayText = 'no';
  let completedDisplayText = 'no';
  if (recurring) { recurringDisplayText = 'yes'; }
  if (completed) { completedDisplayText = 'yes'; }
  return (
    <div key={id}>
      <tr>
        <td>{completedDisplayText}</td>
        <td>{description}</td>
        <td>{recurringDisplayText}</td>
        <td><button type="button" name={id} onClick={deleteTodo}>Delete</button></td>
        <td><button type="button" name={id} onClick={editTodo}>Edit</button></td>
      </tr>
    </div>
  );
};

Todo.propTypes = {
  completed: PropTypes.bool,
  recurring: PropTypes.bool,
  description: PropTypes.string,
  id: PropTypes.number,
  deleteTodo: PropTypes.func,
  editTodo: PropTypes.func,
};


export default Todo;
