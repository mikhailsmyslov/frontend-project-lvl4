import React from 'react';
import { Spinner as BootStrapSpinner } from 'react-bootstrap';

const Spinner = (props) => {
  const { className } = props;
  return (
    <BootStrapSpinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      className={className}
    />
  );
};

export default Spinner;
