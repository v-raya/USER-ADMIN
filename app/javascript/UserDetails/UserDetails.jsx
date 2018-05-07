import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Cards } from 'react-wood-duck';
import ShowField from '../common/ShowField';

const UsersDetails = ({
  last_name,
  first_name,
  middle_name,
  office,
  phone_number,
  email,
  last_login_date_time,
  racfid,
  status,
  start_date,
  end_date,
  enabled,
  county_name,
}) => (
  <div>
    <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
    <PageHeader pageTitle="Manage Users" button="" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Cards
            cardHeaderText="Manage Users: {county_name}"
            cardHeaderButton={true}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Full Name">
                    {last_name}
                    {first_name}
                    {middle_name}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Name">{office}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="CWS Login">{racfid}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Last Login">
                    {last_login_date_time}
                  </ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Email">{email}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Phone Number">
                    {phone_number}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Start Date"> {start_date}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="End Date">{end_date}</ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Status">{enabled}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Assigned Roles">{status}</ShowField>
                </div>
              </div>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  </div>
);

UsersDetails.propTypes = {
  last_name: PropTypes.string,
  first_name: PropTypes.string,
  middle_name: PropTypes.string,
  office: PropTypes.string,
  phone_number: PropTypes.string,
  email: PropTypes.string,
  last_login_date_time: PropTypes.string,
  racfid: PropTypes.string,
  status: PropTypes.string,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  enabled: PropTypes.bool,
  county_name: PropTypes.string,
};

UsersDetails.defaultProps = {
  last_name: 'LastName',
  first_name: 'FirstName',
  middle_name: 'MiddleName',
  office: 'Sacramento',
  phone_number: 'XXX-XXX-XXXX',
  email: 'Hello@osi.ca.gov',
  last_login_date_time: Date(),
  racfid: 'BGDTYSH52681',
  status: 'Intake-core-county',
  start_date: Date(),
  end_date: Date(),
  enabled: true,
  county_name: 'Sacramento',
};

export default UsersDetails;
