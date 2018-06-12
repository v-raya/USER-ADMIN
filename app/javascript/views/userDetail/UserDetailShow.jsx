import React from 'react';
import PropTypes from 'prop-types';
import Cards from '../../common/Card';
import ShowField from '../../common/ShowField';

/* eslint camelcase: 0 */

const UserDetailShow = ({ details, onEdit }) => (
  <div className="row">
    <div className="col-md-12">
      <Cards
        cardHeaderText={`Manage Users: ${details.county_name}`}
        cardHeaderButton={true}
        onEdit={onEdit}
      >
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3">
              <ShowField label="Full Name">
                {details.last_name}, {details.first_name} {details.middle_name}
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
              <ShowField label="Status">{details.enabled}</ShowField>
            </div>
            <div className="col-md-3">
              <ShowField label="Assigned Roles">
                {details.permissions}
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
};

export default UserDetailShow;
