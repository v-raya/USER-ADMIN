import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-wood-duck';

const ErrorMessage = ({ error }) =>
  error ? (
    <Alert
      alertClassName="error"
      faIcon="fa-exclamation-triangle"
      alertCross={false}
    >
      {error.message}
    </Alert>
  ) : null;

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

ErrorMessage.defaultProps = {
  error: {
    message: 'Internal Server Error. Please contact the administrator.',
  },
};
export default ErrorMessage;
