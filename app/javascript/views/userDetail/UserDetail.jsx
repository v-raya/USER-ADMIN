import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Link, Alert } from 'react-wood-duck';
import UserDetailEdit from '../userDetail/UserDetailEdit';
import UserDetailShow from '../userDetail/UserDetailShow';
import UserService from '../../_services/users';
import { currentPathname, getUserId } from '../../sagas/getDetailsSaga';

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

  onSaveDetails = () => {
    const id = getUserId(currentPathname());
    const { details } = this.state;
    const response = UserService.saveUserDetails(id, details);
    this.setState({ isEdit: false, alert: true, saveResponse: response });
  };

  onEditClick = () => {
    this.state.isEdit === false
      ? this.setState({ isEdit: true })
      : this.setState({ isEdit: false });
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

  renderCards = permissionsList => {
    return (
      <div>
        {this.state.details.id ? (
          <div>
            {this.state.isEdit ? (
              <UserDetailEdit
                details={this.state.details}
                selectedPermissions={this.formattedPermissions(
                  this.state.details.permissions
                )}
                onCancel={this.onEditClick}
                onSave={this.onSaveDetails}
                onStatusChange={this.onStatusChange('enabled')}
                onRoleChange={this.onRoleChange}
                enableSave={this.state.enableSave}
                permissionsList={permissionsList}
              />
            ) : (
              <UserDetailShow
                details={this.state.details}
                onEdit={this.onEditClick}
              />
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  formattedPermissions = permissions => {
    if (Array.isArray(permissions)) return permissions;
    if (permissions === null) return [];
    if (typeof permissions !== 'undefined') return permissions.split(',');
    return [];
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
          {this.renderCards(permissionsList)}
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
  userListUrl: process.env.RAILS_RELATIVE_URL_ROOT,
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
