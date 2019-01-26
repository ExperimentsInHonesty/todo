import React from 'react';
import PropTypes from 'prop-types';

const InputTodo = props => (
  <div>
    <input type="text" name="newTodo" id="todoInput" value={props.currentInput} onChange={props.storingInputInState} />
    {props.renderButton()}
  </div>
);

InputTodo.propTypes = {
  currentInput: PropTypes.func,
  storingInputInState: PropTypes.func,
  renderButton: PropTypes.func,
};

export default InputTodo;
