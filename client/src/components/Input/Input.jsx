import React from 'react';

const invalidStyles = {
  border: '1px solid crimson',
};

export const Input = ({ className, ...props }) => {
  const classNames = className ? className : '';
  return <input className={'input ' + classNames} {...props} />;
};

export const IconInput = ({ icon: Icon, className, invalid = '', ...props }) => {
  const classNames = className ? className : '';
  return (
    <div>
      {invalid && (
        <span style={{ color: 'crimson' }}>
          <small>{invalid}</small>
        </span>
      )}
      <div className={'iconWrapper input ' + classNames} style={invalid ? invalidStyles : null}>
        <Icon />
        <input {...props} />
      </div>
    </div>
  );
};
