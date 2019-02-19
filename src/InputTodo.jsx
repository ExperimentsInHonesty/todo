import React from 'react';
import PropTypes from 'prop-types';

const InputTodo = props => (
  <div className='row'>
  <div className='five columns'>
    <label className='input-container'>
      Description
      <input
        type="text"
        name="tempTodoDescription"
        value={props.descriptionInState}
        onChange={props.handleInputChange}
      />
    </label>
    </div>
    <div className='two columns'>
    <label className='input-container center'>
      Recurring
      <input
        type="checkbox"
        name="tempRecurringStatus"
        checked={props.recuringStatusInState}
        onChange={props.handleInputChange}
      />
    </label>
    </div>
    <div className='five columns input-buttons'>
    {props.renderButton()}
    <button type="button" onClick={props.cancelUpdateAndAdd}>Cancel</button>
    </div>
  </div>
);

InputTodo.propTypes = {
  descriptionInState: PropTypes.func,
  recuringStatusInState: PropTypes.func,
  handleInputChange: PropTypes.func,
  renderButton: PropTypes.func,
  cancelUpdateAndAdd: PropTypes.func,
};

export default InputTodo;
