import React from 'react';
import './SelectPrice.styles.scss';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const SelectPrice = ({ label, name, ...props }) => {
  return (
    <div className="selectWrapper">
      <label htmlFor={name}>{label}</label>
      <div className="selectContainer">
        <select className="input" id={name} {...props} name={name}>
          <option value="">0</option>
          {numbers.map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectPrice;
