import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import ShowField from '../../common/ShowField';
import {
  formatPhoneNumberWithExt,
  formatDate,
  formatSelectedPermissions,
} from '../../_utils/formatters';
import { userStatusTranslator } from '../../_utils/codeToTextTranslator';

/* eslint camelcase: 0 */

const UserDetailShow = ({
  details,
  onEdit,
  permissionsList,
  disableEditBtn,
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
            <div className="col-md-5">
              <ShowField label="Full Name">
                {details.last_name}, {details.first_name} {details.middle_name}
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Office Name">{details.office}</ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="CWS Login">{details.racfid}</ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="Last Login">
                {formatDate(details.last_login_date_time)}
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
            <div className="col-md-2">
              <ShowField label="Start Date">
                {formatDate(details.start_date)}
              </ShowField>
            </div>
            <div className="col-md-2">
              <ShowField label="End Date">
                {formatDate(details.end_date)}
              </ShowField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <ShowField label="User Status">
                {details.status}
                <div>
                  <div className="value-text-color">
                    {userStatusTranslator('')}
                  </div>
                </div>
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Account Status">{details.enabled}</ShowField>
            </div>
            <div className="col-md-4">
              <ShowField label="Assigned Permissions">
                {formatSelectedPermissions(
                  details.permissions,
                  permissionsList
                )}
              </ShowField>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  </div>
);

UserDetailShow.propTypes = {
  details: PropTypes.object,
  onEdit: PropTypes.func,
  permissionsList: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  disableEditBtn: PropTypes.bool,
};

UserDetailShow.defaultProps = {
  permissionsList: [],
};

export default UserDetailShow;
