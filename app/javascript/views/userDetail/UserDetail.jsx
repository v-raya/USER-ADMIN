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
      details: props.details,
    };
  }

  componentWillReceiveProps(nextProps) {
    let details = nextProps.details;
    this.setState({ details });
  }

  onStatusChange = name => ({ value }) => {
    const { details } = this.state;
    this.setState({
      details: { ...details, [name]: value },
      enableSave: false,
    });
  };

  onRoleChange = value => {
    const { details } = this.state;
    this.setState({
      enableSave: false,
      details: { ...details, permissions: value },
    });
  };

  alert = () => {
    if (this.state.alert) {
      return (
        <Alert alertClassName="success" faIcon="fa-check-circle">
          {'Your changes have been made successfuly'}
        </Alert>
      );
    }
  };

  render() {
    const {
      dashboardUrl,
      userListUrl,
      userListClickHandler,
      dashboardClickHandler,
      permissionsList,
    } = this.props;
    return (
      <div>
        <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
        <PageHeader pageTitle="User Profile" button="" />
        <div className="container">
          <div className="col-md-12">
            {this.alert()}
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
              details={this.state.details}
              onCancel={() => this.setState({ isEdit: false })}
              onSave={() => this.setState({ isEdit: false, alert: true })}
              onStatusChange={this.onStatusChange('enabled')}
              onRoleChange={this.onRoleChange}
              enableSave={this.state.enableSave}
              permissionsList={permissionsList}
            />
          ) : (
            <UserDetailShow
              details={this.state.details}
              onEdit={() => this.setState({ isEdit: true })}
            />
          )}
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
  permissionsList: PropTypes.array,
};

UserDetail.defaultProps = {
  userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
    ? process.env.RAILS_RELATIVE_URL_ROOT
    : '/',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
