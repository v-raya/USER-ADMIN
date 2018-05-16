import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Cards, Link } from 'react-wood-duck';
import ShowField from '../../common/ShowField';

/* eslint camelcase: 0 */

const UserDetail = ({
  details,
  dashboardUrl,
  userListUrl,
  userListClickHandler,
  dashboardClickHandler,
}) => (
  <div>
    <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
    <PageHeader pageTitle="Manage Users" button="" />
    <div className="col-md-12">
      Back to:{' '}
      <Link
        text="Dashboard"
        href={dashboardUrl}
        clickHandler={dashboardClickHandler}
      />
      &nbsp;&gt;&nbsp;
      <Link
        text="Manage Users"
        href={userListUrl}
        clickHandler={userListClickHandler}
      />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Cards
            cardHeaderText={`Manage Users: ${details.county_name}`}
            cardHeaderButton={true}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Full Name">
                    {details.last_name}
                    {details.first_name}
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
                  <ShowField label="Start Date">
                    {' '}
                    {details.start_date}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="End Date">{details.end_date}</ShowField>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <ShowField label="Status">
                    {String(details.enabled)}
                  </ShowField>
                </div>
                <div className="col-md-3">
                  <ShowField label="Assigned Roles">{details.status}</ShowField>
                </div>
              </div>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  </div>
);

UserDetail.propTypes = {
  details: PropTypes.object,
  dashboardUrl: PropTypes.string,
  userListUrl: PropTypes.string,
  userListClickHandler: PropTypes.func,
  dashboardClickHandler: PropTypes.func,
};

UserDetail.defaultProps = {
  userListUrl: '/#',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};

export default UserDetail;
