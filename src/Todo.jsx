import React from "react";

const Todo = ({recurring, completed, description, id, name}) => {
  // const recurring = props.recurring
  // const {recurring, completed} = props
  let recurringDisplayText = 'no';
  let completedDisplayText = 'no';
  if (recurring) { recurringDisplayText = 'yes'; }
  if (completed) { completedDisplayText = 'yes'; }
  return (
    <div>
      <p>
        completed: {completedDisplayText}
      </p>
      <p>
        recurring: {recurringDisplayText}
      </p>
      <p>
        name: {name}
      </p>
      <p>
        {description} <button type="button">Delete</button>
      </p>
      <p>
        id: {id}
      </p>
    </div>
  );
};


export default Todo;
