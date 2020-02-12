import React from 'react';

const Radio = props => {
  return (
    <div className="RadioButton">
      <input
        id={props.id}
        onChange={props.handleChange}
        value={props.value}
        type="radio"
        name={props.name}
        checked={props.isSelected}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default Radio;
