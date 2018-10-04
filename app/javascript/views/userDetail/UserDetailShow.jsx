import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import ShowField from '../../common/ShowField';
import { translateOffice } from '../../_constants/constants';
import {
  formatPhoneNumberWithExt,
  formatDate,
  formatSelectedPermissions,
  checkDate,
} from '../../_utils/formatters';
import {
  userStatusDescriptionTranslator,
  userStatusTranslator,
  accountStatus,
} from '../../_utils/codeToTextTranslator';

/* eslint camelcase: 0 */

const UserDetailShow = ({
  details,
  onEdit,
  permissionsList,
  disableEditBtn,
  officesList,
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
                <div>
                  <div className="value-text-color">
                    {userStatusDescriptionTranslator(details.status)}
                  </div>
                </div>
              </ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Account Status">
                {accountStatus(details.enabled)}
              </ShowField>
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
  officesList: PropTypes.arrayOf(
    PropTypes.shape({
      office_name: PropTypes.string.isRequired,
      office_id: PropTypes.string.isRequired,
    })
  ),
};

UserDetailShow.defaultProps = {
  permissionsList: [],
};

export default UserDetailShow;
