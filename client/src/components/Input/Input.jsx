import React from 'react';

const invalidStyles = {
  border: '1px solid crimson',
};

export const Input = ({ className, ...props }) => {
  const classNames = className ? className : '';
  return <input className={'input ' + classNames} {...props} />;
};

export const IconInput = ({ icon: Icon, className, invalid = false, msg = '', ...props }) => {
  const classNames = className ? className : '';
  return (
    <div>
      {invalid && (
        <span style={{ color: 'crimson' }}>
          <small>{msg}</small>
        </span>
      )}
      <div className={'iconWrapper input ' + classNames} style={invalid ? invalidStyles : null}>
        <Icon />
        <input {...props} />
      </div>
    </div>
  );
};
