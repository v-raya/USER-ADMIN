import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import ShowField from '../../common/ShowField';
import { Button } from 'react-wood-duck';
import DropDownField from 'react-wood-duck/dist/DropDownField';
import MultiSelect from '../../common/MultiSelect';
import {
  STATUS,
  permissionListToOptions,
  translateOffice,
} from '../../_constants/constants';
import {
  formatPhoneNumberWithExt,
  formatDate,
  checkDate,
} from '../../_utils/formatters';
import {
  userStatusDescriptionTranslator,
  userStatusTranslator,
} from '../../_utils/codeToTextTranslator';

/* eslint camelcase: 0 */

const UserDetailEdit = ({
  disableResendEmailButton,
  details,
  selectedPermissions,
  onCancel,
  onSave,
  disableActionBtn,
  onStatusChange,
  onRoleChange,
  permissionsList,
  onResendInvite,
  officesList,
}) => (
  <div className="row">
    <div className="col-md-12">
      <Cards
        cardHeaderText={`County: ${details.county_name}`}
        cardActionButtons={true}
        cardActionButton1={true}
        cardActionButton2={true}
        handleOnClickButton1={onCancel}
        handleOnClickButton2={onSave}
        disableActionBtn={disableActionBtn}
        leftActionBtnName="Cancel"
      >
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-5">
              <ShowField label="Full Name">
                {details.last_name}, {details.first_name} {details.middle_name}
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Name">
                {translateOffice(details, officesList)}
              </ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="CWS Login">{details.racfid}</ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="Last Login">
                {checkDate(details.last_login_date_time)}
              </ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <ShowField label="Email">{details.email}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Phone Number">
                <span>{formatPhoneNumberWithExt(details)}</span>
              </ShowField>
            </div>
            <div className="col-md-4">
              <ShowField label="Start Date">
                {formatDate(details.start_date)}
              </ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <ShowField label="User Status">
                {userStatusTranslator(details.status)}
                <div className="value-text-color">
                  {userStatusDescriptionTranslator(details.status)}
                  {details.status === 'FORCE_CHANGE_PASSWORD' && (
                    <div className="resend-email-btn">
                      <Button
                        btnClassName="primary"
                        btnName="Resend Invite"
                        onClick={onResendInvite}
                        disabled={disableResendEmailButton}
                      />
                    </div>
                  )}
                </div>
              </ShowField>
            </div>
            <div className="col-md-3">
              <DropDownField
                id="dropdown1"
                selectedOption={details.enabled}
                options={STATUS}
                label="Account Status"
                onChange={onStatusChange}
              />
            </div>
            <div className="col-md-4">
              <MultiSelect
                id="Multiselect1"
                selectedOption={selectedPermissions}
                options={permissionListToOptions(permissionsList)}
                label="Assigned Permissions"
                onChange={selectedOptions =>
                  onRoleChange(selectedOptions.split(','))
                }
              />
            </div>
          </div>
        </div>
      </Cards>
    </div>
  </div>
);

UserDetailEdit.propTypes = {
  details: PropTypes.object,
  selectedPermissions: PropTypes.array,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  disableActionBtn: PropTypes.bool,
  onStatusChange: PropTypes.func,
  onRoleChange: PropTypes.func,
  permissionsList: PropTypes.array,
  onResendInvite: PropTypes.func,
  disableResendEmailButton: PropTypes.bool,
  officesList: PropTypes.arrayOf(
    PropTypes.shape({
      office_name: PropTypes.string.isRequired,
      office_id: PropTypes.string.isRequired,
    })
  ),
};

UserDetailEdit.defaultProps = {
  selectedPermissions: [],
  permissionsList: [],
};

export default UserDetailEdit;
