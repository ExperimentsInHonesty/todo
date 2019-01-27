import React from 'react';
import PropTypes from 'prop-types';

const InputTodo = props => (
  <div>
    <label>
      Description
      <input
        type="text"
        name="tempTodoDescription"
        value={props.descriptionInState}
        onChange={props.handleInputChange}
      />
    </label>
    <br/>
    <label>
      Recurring:
      <input
        type="checkbox"
        name="tempRecurringStatus"
        checked={props.recuringStatusInState}
        onChange={props.handleInputChange}
      />
    </label>
    <br/>{props.renderButton()}
    <button type="button" onClick={props.cancelUpdateAndAdd}>Cancel</button>
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
