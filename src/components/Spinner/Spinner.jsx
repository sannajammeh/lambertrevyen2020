import React from 'react';
import './Spinner.styles.scss';

const spinner = WrappedComponent => ({ isLoading, ...props }) => {
  return isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  ) : (
    <WrappedComponent {...props} />
  );
};
export default spinner;
