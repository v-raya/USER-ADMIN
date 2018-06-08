import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import ShowField from '../../common/ShowField';
import DropDownField from 'react-wood-duck/dist/DropDownField';
import MultiSelect from '../../common/MultiSelect';
import { STATUS } from '../../_constants/userDetailConstants';

/* eslint camelcase: 0 */

const UserDetailEdit = ({
  details,
  selectedPermissions,
  onCancel,
  onSave,
  enableSave,
  onStatusChange,
  onRoleChange,
  permissionsList,
}) => (
  <div className="row">
    <div className="col-md-12">
      <Cards
        cardHeaderText={`Manage Users: ${details.county_name}`}
        cardActionButtons={true}
        onCancel={onCancel}
        onSave={onSave}
        enableSave={enableSave}
      >
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Full Name">
                {details.last_name},
                {details.first_name}
                {details.middle_name}
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Name">{details.office}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="CWS Login">{details.RACFID}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Last Login">
                {details.last_login_date_time}
              </ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Email">{details.email}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Phone Number">
                <span>{details.phone_number}</span>
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Start Date"> {details.start_date}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="End Date">{details.end_date}</ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <DropDownField
                id="dropdown1"
                selectedOption={details.enabled}
                options={STATUS}
                label="Status"
                onChange={onStatusChange}
              />
            </div>
            <div className="col-md-3">
              <MultiSelect
                id="Multiselect1"
                selectedOption={selectedPermissions}
                options={permissionsList}
                label="Assigned Roles"
                onChange={onRoleChange}
              />
            </div>
          </div>
        </div>
      </Cards>
    </div>
  </div>
);

export function formatPermissions(permissions) {
  return permissions && !Array.isArray(permissions)
    ? permissions.split(',')
    : !permissions
      ? []
      : permissions;
}
UserDetailEdit.propTypes = {
  details: PropTypes.object,
  selectedPermissions: PropTypes.array,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  enableSave: PropTypes.bool,
  onStatusChange: PropTypes.func,
  onRoleChange: PropTypes.func,
  permissionsList: PropTypes.array,
};

export default UserDetailEdit;
