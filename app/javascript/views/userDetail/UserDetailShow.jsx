import React from 'react'
import PropTypes from 'prop-types'
import Cards from '../../common/Card'
import ShowField from '../../common/ShowField'
import { formatPhoneNumberWithExt, checkDate, formatSelectedRoles } from '../../_utils/formatters'
import { Button } from 'react-wood-duck'

/* eslint camelcase: 0 */

const UserDetailShow = ({
  details,
  onEdit,
  startDate,
  disableEditBtn,
  rolesList,
  accountStatus,
  userStatus,
  userStatusDescription,
  assignedPermissions,
  officeName,
  onResendInvite,
  disableResendEmailButton,
  resentRegistrationEmailDateTime,
}) => (
  <div className="row">
    <div className="col-md-12">
      <Cards
        cardHeaderText={`County: ${details.county_name}`}
        cardHeaderButton={true}
        onEdit={onEdit}
        disabled={disableEditBtn}
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
              <ShowField label="Role">{formatSelectedRoles(details.roles, rolesList)}</ShowField>
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
          <br />
          <div className="row">
            <div className="col-md-3">
              <ShowField label="User Status">
                {userStatus}
                <div>
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
                            disabled={disableEditBtn || disableResendEmailButton}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Account Status">{accountStatus}</ShowField>
            </div>
            <div className="col-md-6">
              <ShowField label="Assigned Permissions">{assignedPermissions}</ShowField>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  </div>
)

UserDetailShow.propTypes = {
  details: PropTypes.object,
  officeName: PropTypes.string,
  userStatus: PropTypes.string,
  userStatusDescription: PropTypes.string,
  accountStatus: PropTypes.string,
  onResendInvite: PropTypes.func,
  disableResendEmailButton: PropTypes.bool,
  assignedPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onEdit: PropTypes.func,
  startDate: PropTypes.string,
  resentRegistrationEmailDateTime: PropTypes.string,
  rolesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  disableEditBtn: PropTypes.bool,
}

export default UserDetailShow
