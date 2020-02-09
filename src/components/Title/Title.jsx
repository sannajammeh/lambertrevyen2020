import React from 'react';
import './Title.styles.scss';

const sizes = {
  sm: '2rem',
  md: '3rem',
  lg: '5rem',
};
export const Title = ({ size, style, children, className, ...props }) => (
  <h1
    {...props}
    className={className ? className + ' title' : 'title'}
    style={{ fontSize: size ? sizes[size] : null, ...style }}
  >
    {children}
  </h1>
);
