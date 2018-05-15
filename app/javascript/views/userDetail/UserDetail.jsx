import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Cards } from 'react-wood-duck';
import ShowField from '../../common/ShowField';

/* eslint camelcase: 0 */

const UserDetail = ({ userDetail }) => (
  <div>
    <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
    <PageHeader pageTitle="Manage Users" button="" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {/* <Cards
            cardHeaderText="Manage Users: {county_name}"
            cardHeaderButton={true}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Full Name">
                    {userDetail.first_name}
                    {userDetail.middle_name}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Name">{userDetail.office}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="CWS Login">{userDetail.racfid}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Last Login">
                    {userDetail.last_login_date_time}
                  </ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Email">{userDetail.email}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Office Phone Number">
                    {userDetail.phone_number}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Start Date">
                    {' '}
                    {userDetail.start_date}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="End Date">{userDetail.end_date}</ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Status">{userDetail.enabled}</ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Assigned Roles">
                    {userDetail.status}
                  </ShowField>
                </div>
              </div>
            </div>
          </Cards> */}
        </div>
      </div>
    </div>
  </div>
);

UserDetail.propTypes = {
  userDetail: PropTypes.object,
};

// UserDetail.defaultProps = {
//   last_name: 'LastName',
//   first_name: 'FirstName',
//   middle_name: 'MiddleName',
//   office: 'Sacramento',
//   phone_number: '000-000-0022',
//   email: 'Hello@osi.ca.gov',
//   last_login_date_time: Date(),
//   racfid: 'BGDTYSH52681',
//   status: 'Intake-core-county',
//   start_date: Date(),
//   end_date: Date(),
//   enabled: true,
//   county_name: 'Sacramento',
// };

export default UserDetail;
