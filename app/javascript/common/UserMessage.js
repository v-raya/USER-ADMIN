import PropTypes from 'prop-types'
import React from 'react'
import { Alert } from '@cwds/components'

const UserMessage = ({ errorMsg, successMsg }) => {
  return (
    <React.Fragment>
      {successMsg && (
        <Alert className="successMessage-customizable" color="success">
          {successMsg}
        </Alert>
      )}
      {errorMsg && (
        <Alert className="errorMessage-customizable" color="danger">
          {errorMsg.user_message ? errorMsg.user_message : errorMsg}
        </Alert>
      )}
    </React.Fragment>
  )
}
UserMessage.propTypes = {
  errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  successMsg: PropTypes.string,
}

export default UserMessage
