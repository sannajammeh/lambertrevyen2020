import React from 'react';

export const Input = ({ className, ...props }) => {
  const classNames = className ? className : '';
  return <input className={'input ' + classNames} {...props} />;
};
export const IconInput = ({ icon: Icon, className, ...props }) => {
  const classNames = className ? className : '';
  return (
    <div className={'iconWrapper input ' + classNames}>
      <Icon />
      <input {...props} />
    </div>
  );
};
