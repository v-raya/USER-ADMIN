import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Alert, PageHeader } from 'react-wood-duck';
import UserDetailEdit from './UserDetailEdit';
import UserDetailShow from './UserDetailShow';
import UserService from '../../_services/users';

/* eslint camelcase: 0 */
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      alert: false,
      disableActionBtn: true,
      details: props.details,
    };
  }

  componentDidMount() {
    this.props.actions.fetchDetailsActions(
      this.getUserId(this.currentPathname())
    );
    this.props.actions.fetchPermissionsActions();
  }

  currentPathname() {
    return window.location.pathname;
  }

  getUserId(pathname) {
    const pathArray = pathname.split('/');
    const id = pathArray[pathArray.length - 1];
    return id;
  }

  componentWillReceiveProps(nextProps) {
    let details = nextProps.details;
    this.setState({ details });
  }

  onStatusChange = name => ({ value }) => {
    const { details } = this.state;
    this.setState({
      details: { ...details, [name]: value },
      disableActionBtn: false,
    });
  };

  onRoleChange = value => {
    const { details } = this.state;
    this.setState({
      disableActionBtn: false,
      details: { ...details, permissions: value },
    });
  };

  onSaveDetails = () => {
    const id = this.getUserId(this.currentPathname());
    const { details } = this.state;
    const response = UserService.saveUserDetails(id, details);
    this.setState({ isEdit: false, alert: true, saveResponse: response });
  };

  onEditClick = () => {
    this.setState({ isEdit: true });
  };

  onCancel = () => {
    this.setState({ isEdit: false });
    this.props.actions.fetchDetailsActions();
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
                onCancel={this.onCancel}
                onSave={this.onSaveDetails}
                onStatusChange={this.onStatusChange('enabled')}
                onRoleChange={this.onRoleChange}
                disableActionBtn={this.state.disableActionBtn}
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
  actions: PropTypes.object.isRequired,
};

UserDetail.defaultProps = {
  userListUrl: '/',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
