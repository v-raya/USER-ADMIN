import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Link, Alert } from 'react-wood-duck';
import ShowField from '../../common/ShowField';
import Cards from '../../common/Card';
import UserDetailEdit from '../userDetail/UserDetailEdit';

/* eslint camelcase: 0 */
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      alert: false,
      enableSave: true,
    };
  }

  onStatusChange = value => {
    this.setState({ enableSave: false });
  };

  onRoleChange = value => {
    this.setState({ enableSave: false });
  };

  render() {
    const {
      details,
      dashboardUrl,
      userListUrl,
      userListClickHandler,
      dashboardClickHandler,
    } = this.props;

    return (
      <div>
        <div>
          <GlobalHeader
            profileName="County CWDS-Admin"
            profileId="profile.id"
          />
          <PageHeader pageTitle="User Profile" button="" />
          <div className="container">
            <div className="col-md-12">
              {this.state.alert && (
                <Alert alertClassName="success" faIcon="fa-check-circle">
                  {'Your changes have been made successfuly'}
                </Alert>
              )}
              Back to:{' '}
              <Link
                text="Dashboard"
                href={dashboardUrl}
                clickHandler={dashboardClickHandler}
              />
              &nbsp;&gt;&nbsp;
              <Link
                text="User List"
                href={userListUrl}
                clickHandler={userListClickHandler}
              />
            </div>
            {this.state.isEdit ? (
              <div>
                {' '}
                <UserDetailEdit
                  details={details}
                  onCancel={() => this.setState({ isEdit: false })}
                  onSave={() => this.setState({ isEdit: false, alert: true })}
                  onStatusChange={this.onStatusChange}
                  onRoleChange={this.onRoleChange}
                  enableSave={this.state.enableSave}
                />{' '}
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <Cards
                    cardHeaderText={`Manage Users: ${details.county_name}`}
                    cardHeaderButton={true}
                    onEdit={() => this.setState({ isEdit: true })}
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
                          <ShowField label="Office Name">
                            {details.office}
                          </ShowField>
                        </div>
                        <div className="col-md-3">
                          <ShowField label="CWS Login">
                            {details.RACFID}
                          </ShowField>
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
                          <ShowField label="End Date">
                            {details.end_date}
                          </ShowField>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <ShowField label="Status">
                            {String(details.enabled)}
                          </ShowField>
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
  details: PropTypes.object,
  dashboardUrl: PropTypes.string,
  userListUrl: PropTypes.string,
  userListClickHandler: PropTypes.func,
  dashboardClickHandler: PropTypes.func,
};

UserDetail.defaultProps = {
  userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
    ? process.env.RAILS_RELATIVE_URL_ROOT
    : '/',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
