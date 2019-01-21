import React from "react";

const Todo = ({recurring, completed, description, id, name, deleteTodo}) => {
  // const recurring = props.recurring
  // const {recurring, completed} = props
  let recurringDisplayText = 'no';
  let completedDisplayText = 'no';
  if (recurring) { recurringDisplayText = 'yes'; }
  if (completed) { completedDisplayText = 'yes'; }
  return (
    <div>
      <tr>
        <td>{completedDisplayText}</td>
        <td>{description}</td>
        <td>{recurringDisplayText}</td>
        <td><button type="button" name={id} onClick={deleteTodo}>Delete</button></td>
      </tr>
    </div>
  );
};


export default Todo;
