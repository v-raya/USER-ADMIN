import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Link, Alert } from 'react-wood-duck';
import UserDetailEdit from '../userDetail/UserDetailEdit';
import UserDetailShow from '../userDetail/UserDetailShow';

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
              <UserDetailEdit
                details={details}
                onCancel={() => this.setState({ isEdit: false })}
                onSave={() => this.setState({ isEdit: false, alert: true })}
                onStatusChange={this.onStatusChange}
                onRoleChange={this.onRoleChange}
                enableSave={this.state.enableSave}
              />
            ) : (
              <UserDetailShow
                details={details}
                onEdit={() => this.setState({ isEdit: true })}
              />
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
