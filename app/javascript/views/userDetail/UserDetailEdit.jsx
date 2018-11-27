import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import ShowField from '../../common/ShowField'
import { Button } from 'react-wood-duck'
import DropDown from '../../common/DropDown'
import { STATUS } from '../../_constants/constants'
import { checkDate, formatPhoneNumberWithExt } from '../../_utils/formatters'

/* eslint camelcase: 0 */

const UserDetailEdit = ({
  disableResendEmailButton,
  details,
  onCancel,
  onSave,
  disableActionBtn,
  permissionsList,
  onResendInvite,
  possibleRolesList,
  isRolesDisabled,
  onDropDownChange,
  startDate,
  userStatus,
  userStatusDescription,
  officeName,
  resentRegistrationEmailDateTime,
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
                selectedOption={details.roles.toString()}
                id="RolesDropDown"
                label="Role"
                onChange={event => onDropDownChange('roles', [event.value])}
                options={possibleRolesList}
                disabled={isRolesDisabled}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Email">{details.email}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Phone Number">
                <span>{formatPhoneNumberWithExt(details)}</span>
              </ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="Start Date">{startDate}</ShowField>
            </div>
            <div className="col-md-4">
              <ShowField label="Last Login">{checkDate(details.last_login_date_time)}</ShowField>
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
                          {resentRegistrationEmailDateTime ? (
                            <div className="resend-email-text">
                              {'Registration email resent:'}
                              <br />
                              {checkDate(resentRegistrationEmailDateTime)}
                            </div>
                          ) : details.last_registration_resubmit_date_time ? (
                            <div className="resend-email-text">
                              {'Registration email resent:'}
                              <br />
                              {checkDate(details.last_registration_resubmit_date_time)}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="resend-email-btn">
                          <Button
                            btnClassName="primary"
                            btnName="Resend Invite"
                            onClick={onResendInvite}
                            disabled={disableResendEmailButton}
                          />
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
                  selectedOption={details.enabled}
                  options={STATUS}
                  label="Account Status"
                  onChange={event => onDropDownChange('enabled', event.value)}
                />
              </div>
              <div className="col-md-6">
                <DropDown
                  id="AssignPermissions"
                  selectedOption={details.permissions}
                  options={permissionsList}
                  label="Assigned Permissions"
                  onChange={selectedOptions => onDropDownChange('permissions', selectedOptions.split(','))}
                  multiSelect
                  simpleValue
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
  onSave: PropTypes.func,
  disableActionBtn: PropTypes.bool,
  onDropDownChange: PropTypes.func,
  onStatusChange: PropTypes.func,
  onRoleChange: PropTypes.func,
  onPermissionChange: PropTypes.func,
  userStatusDescription: PropTypes.string,
  userStatus: PropTypes.string,
  resentRegistrationEmailDateTime: PropTypes.string,
  permissionsList: PropTypes.array,
  onResendInvite: PropTypes.func,
  disableResendEmailButton: PropTypes.bool,
  possibleRolesList: PropTypes.array,
  rolesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  isRolesDisabled: PropTypes.bool,
}

UserDetailEdit.defaultProps = {
  permissionsList: [],
}

export default UserDetailEdit
