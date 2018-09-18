import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import { Alert } from 'react-wood-duck';
import ShowField from '../../common/ShowField';
import { verificationError } from '../../_utils/errorCodes';
import { formatPhoneNumberWithExt } from '../../_utils/formatters';

/* eslint camelcase: 0 */

const AddNewUser = ({ onCancel, onSave, verifyNewUserDetails }) => {
  const userDetails = verifyNewUserDetails.verifiedUserDetails
    ? verifyNewUserDetails.verifiedUserDetails
    : {};
  return (
    <div>
      {userDetails.verification_passed ? (
        <div className="row">
          <div className="col-md-12">
            <Cards
              cardHeaderText="Add User"
              cardActionButtons={true}
              onSave={onSave}
              rightActionBtnName="Add User"
            >
              <div className="col-md-12">
                <div className="row">
                  <label htmlFor="text">
                    Please Verify the details of the CWS/CMS user you want to
                    add to CWS-CARES
                  </label>
                  <div className="col-md-3">
                    <ShowField label="Full Name">
                      {userDetails.user.last_name}
                      {', '}
                      {userDetails.user.first_name}{' '}
                      {userDetails.user.middle_name}
                    </ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="Office Name">
                      {userDetails.user.office}
                    </ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="CWS Login">
                      {userDetails.user.racfid}
                    </ShowField>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <ShowField label="Email">
                      {userDetails.user.email}
                    </ShowField>
                  </div>
                  <div className="col-md-3">
                    <ShowField label="Office Phone Number">
                      <span>{formatPhoneNumberWithExt(userDetails.user)}</span>
                    </ShowField>
                  </div>
                </div>
              </div>
            </Cards>
          </div>
        </div>
      ) : userDetails.verification_passed === false ? (
        <div className="row">
          <div className="col-md-12">
            <div className="alert">
              <Alert
                alertClassName="error"
                faIcon="fa-exclamation-triangle"
                alertCross={false}
              >
                {verificationError(
                  userDetails.error_code,
                  verifyNewUserDetails.verify.email,
                  verifyNewUserDetails.verify.racfid
                ) || userDetails.verification_message}
              </Alert>
            </div>
          </div>
        </div>
      ) : (
        <Cards>
          <span>{'Loading.....'}</span>
        </Cards>
      )}
    </div>
  );
};

AddNewUser.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  verifyNewUserDetails: PropTypes.object,
  email: PropTypes.string,
  racfid: PropTypes.string,
};

export default AddNewUser;
