import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import ShowField from '../../common/ShowField'
import { InputComponent } from 'react-wood-duck'
import DropDown from '../../common/DropDown'
import { STATUS } from '../../_constants/constants'

/* eslint camelcase: 0 */

const UserDetailEdit = ({
  details,
  onCancel,
  onSave,
  disableActionBtn,
  possiblePermissionsList,
  possibleRolesList,
  isRolesDisabled,
  onDropDownChange,
  startDate,
  userStatus,
  userStatusDescription,
  officeName,
  resentRegistrationNewDateTime,
  onInputChange,
  isEmailValid,
  lastLoginDateTime,
  resentRegistrationExistingDateTime,
  officePhoneNumber,
  workerPhoneNumber,
}) => (
  <div className="row">
    <div className="col-md-12">
      <Cards
        cardHeaderText={`County: ${details.county_name}`}
        cardActionButtons
        cardActionButton1
        cardActionButton2
        handleOnClickButton1={onCancel}
        handleOnClickButton2={onSave}
        disableActionBtn={disableActionBtn}
        leftActionBtnName="Cancel"
      >
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Full Name">
                {details.last_name}, {details.first_name} {details.middle_name}
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Name">{officeName}</ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="CWS Login">{details.racfid}</ShowField>
            </div>
            <div className="col-md-4">
              <DropDown
                multiSelect={false}
                simpleValue={false}
                selectedOption={possibleRolesList.find(({ value }) => value === details.roles.toString())}
                id="RolesDropDown"
                label="Role"
                onChange={selectedValue => onDropDownChange('roles', [selectedValue.value])}
                options={possibleRolesList}
                disabled={isRolesDisabled}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <InputComponent
                id="InputEmail"
                label="Email"
                fieldClassName="form-group"
                type="email"
                placeholder="Add Email Address"
                value={details.email}
                onChange={event => onInputChange(event.target.value)}
                validationError={!isEmailValid}
                validationErrorMessage={'Please enter a valid email'}
              />
            </div>
            <div className="col-md-3">
              <ShowField label="Office Phone Number">
                <span>{officePhoneNumber}</span>
              </ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="Start Date">{startDate}</ShowField>
            </div>
            <div className="col-md-4">
              <ShowField label="Last Login">{lastLoginDateTime}</ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Phone Number">
                <span>{workerPhoneNumber}</span>
              </ShowField>
            </div>
          </div>
          <br />
          <div className="row">
            <div>
              <div className="col-md-3">
                <ShowField label="User Status">
                  {userStatus}
                  <div className="value-text-color">
                    {userStatusDescription}
                    {details.status === 'FORCE_CHANGE_PASSWORD' && (
                      <div>
                        <div>
                          {resentRegistrationNewDateTime ? (
                            <div className="resend-email-text">
                              {'Registration email resent:'}
                              <br />
                              {resentRegistrationNewDateTime}
                            </div>
                          ) : resentRegistrationExistingDateTime ? (
                            <div className="resend-email-text">
                              {'Registration email resent:'}
                              <br />
                              {resentRegistrationExistingDateTime}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </ShowField>
              </div>
              <div className="col-md-3">
                <DropDown
                  multiSelect={false}
                  simpleValue={false}
                  id="StatusDropDown"
                  selectedOption={STATUS.find(({ value }) => value === details.enabled)}
                  options={STATUS}
                  label="Account Status"
                  onChange={selectedValue => onDropDownChange('enabled', selectedValue.value)}
                />
              </div>
              <div className="col-md-6">
                <DropDown
                  id="AssignPermissions"
                  selectedOption={possiblePermissionsList.filter(({ value }) => details.permissions.includes(value))}
                  options={possiblePermissionsList}
                  label="Assigned Permissions"
                  onChange={possiblePermissionsList =>
                    onDropDownChange('permissions', possiblePermissionsList.map(value => value.value))
                  }
                  multiSelect={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  </div>
)

UserDetailEdit.propTypes = {
  officeName: PropTypes.string,
  details: PropTypes.object,
  onCancel: PropTypes.func,
  startDate: PropTypes.string,
  lastLoginDateTime: PropTypes.string,
  onSave: PropTypes.func,
  disableActionBtn: PropTypes.bool,
  onDropDownChange: PropTypes.func,
  onStatusChange: PropTypes.func,
  onRoleChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onPermissionChange: PropTypes.func,
  userStatusDescription: PropTypes.string,
  userStatus: PropTypes.string,
  resentRegistrationNewDateTime: PropTypes.string,
  resentRegistrationExistingDateTime: PropTypes.string,
  possibleRolesList: PropTypes.array,
  isEmailValid: PropTypes.bool,
  officePhoneNumber: PropTypes.string,
  disableResendEmailButton: PropTypes.bool,
  possiblePermissionsList: PropTypes.array,
  isRolesDisabled: PropTypes.bool,
  workerPhoneNumber: PropTypes.string,
}

UserDetailEdit.defaultProps = {
  possiblePermissionsList: [],
}

export default UserDetailEdit
