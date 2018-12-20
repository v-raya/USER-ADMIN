import PropTypes from 'prop-types'
import React from 'react'
import { Alert } from '@cwds/components'

const ErrorMessage = ({ error }) =>
  error ? (
    <Alert className="errorMessage-customizable" color="danger">
      {error.user_message}
    </Alert>
  ) : null

ErrorMessage.propTypes = {
  error: PropTypes.object,
}

ErrorMessage.defaultProps = {
  error: {
    message: 'Internal Server Error. Please contact the administrator.',
  },
}
export default ErrorMessage
