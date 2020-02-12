import React from 'react';
import './Spinner.styles.scss';

const spinner = WrappedComponent => ({ inline, isLoading, ...props }) => {
  return isLoading ? (
    <div className={`spinner-overlay ${inline ? 'inline' : ''}`}>
      <div className="spinner-container"></div>
    </div>
  ) : (
    <WrappedComponent {...props} />
  );
};
export default spinner;
