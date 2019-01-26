import React from 'react';

const InputTodo = props => (
  <div>
    <input type="text" name="newTodo" id="todoInput" value={props.currentInput} onChange={props.storingInputInState} />
    <button type="button" onClick={props.addTodoTolList}>Add</button>
    <button type="button" onClick={props.updateTodo}>Update</button>
    {/* if (props.editingTodo) {
    button = <button type="button" onClick={props.addTodoTolList}>Add</button>
    } else {
    button = <button type="button" onClick={props.updateTodo}>Update</button>
    } */}

  </div>
);

export default InputTodo;
