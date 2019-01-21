import React from 'react';

const InputTodo = (props) => {
  // console.log(props);
  return (
    <div>
      <input type="text" name="newTodo" id="todoInput" onChange={props.storingInputInState}/>
      <button type="button" onClick={props.addTodoTolList}>Add</button>
    </div>
  );
};

export default InputTodo;
