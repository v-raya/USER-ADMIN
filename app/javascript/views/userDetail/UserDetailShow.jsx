import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import ShowField from '../../common/ShowField';

/* eslint camelcase: 0 */

const UserDetailShow = ({ details, onEdit, permissionsList }) => {
  console.log({ details });
  return (
    <div className="row">
      <div className="col-md-12">
        <Cards
          cardHeaderText={`County: ${details.county_name}`}
          cardHeaderButton={true}
          onEdit={onEdit}
        >
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3">
                <ShowField label="Full Name">
                  {details.last_name}, {details.first_name}{' '}
                  {details.middle_name}
                </ShowField>
              </div>
              <div className="col-md-3">
                <ShowField label="Office Name">{details.office}</ShowField>
              </div>
              <div className="col-md-3">
                <ShowField label="CWS Login">{details.racfid}</ShowField>
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
                <ShowField label="Status">{details.enabled}</ShowField>
              </div>
              <div className="col-md-3">
                <ShowField label="Assigned Permissions">
                  {details.permissions &&
                    details.permissions.length &&
                    details.permissions
                      .map(permission =>
                        permissionsList.find(d => d.value === permission)
                      )
                      .filter(value => !!value)
                      .map(({ key, label }) => label)
                      .join(', ')}
                </ShowField>
              </div>
            </div>
          </div>
        </Cards>
      </div>
    </div>
  );
};

UserDetailShow.propTypes = {
  details: PropTypes.object,
  onEdit: PropTypes.func,
  pemissionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

UserDetailShow.defaultProps = {
  pemissionsList: [],
};

export default UserDetailShow;
