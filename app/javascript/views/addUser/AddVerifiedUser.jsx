import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import ShowField from '../../common/ShowField';

/* eslint camelcase: 0 */

const AddNewUser = ({ onCancel, onSave, verifyNewUserDetails }) => {
  console.log(verifyNewUserDetails);
  return (
    <div>
      {verifyNewUserDetails.verification_passed ? (
        <div className="row">
          <div className="col-md-12">
            <Cards
              cardHeaderText="Add User"
              cardActionButtons={true}
              onSave={onSave}
              rightActionBtnName="Add User"
            >
              <label>
                Please Verify the details of the user before you add
              </label>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Full Name">
                    {verifyNewUserDetails.user.last_name},
                    {verifyNewUserDetails.user.first_name},
                    {verifyNewUserDetails.user.middle_name}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Name">
                    {verifyNewUserDetails.user.office}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="CWS Login">
                    {verifyNewUserDetails.user.racfid}
                  </ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Email">
                    {verifyNewUserDetails.user.email}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Phone Number">
                    <span>{verifyNewUserDetails.user.phone_number}</span>
                  </ShowField>
                </div>
              </div>
            </Cards>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <Cards cardHeaderText="Add User" cardActionButtons={false}>
              <label>{verifyNewUserDetails.verification_message}</label>
            </Cards>
          </div>
        </div>
      )}
    </div>
  );
};

AddNewUser.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  verifyNewUserDetails: PropTypes.object,
};

export default AddNewUser;
