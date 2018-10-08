import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Alert, PageHeader, Cards } from 'react-wood-duck';
import UserDetailEdit from '../userDetail/UserDetailEdit';
import UserDetailShow from '../userDetail/UserDetailShow';
import ErrorMessage from '../../common/ErrorMessage';

/* eslint camelcase: 0 */
export default class AddUserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      alert: false,
      disableActionBtn: true,
      details: props.details,
      id: props.id,
      add: true,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let id = nextProps.id;
    let permissionRoles = nextProps.permissionRoles;
    let details = nextProps.details;
    this.setState({ details, id, permissionRoles });
  }

  componentDidUpdate(prevProps) {
    if (this.state.id !== prevProps.id) {
      this.props.actions.fetchDetailsActions(this.state.id);
    }
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
    const { details, id } = this.state;
    this.props.actions.saveUserDetailsActions(id, details);
    this.setState({ isEdit: false, alert: true });
  };

  onEditClick = () => {
    this.state.isEdit === false
      ? this.setState({ isEdit: true, alert: false, add: false })
      : this.setState({ isEdit: false });
  };

  onCancel = () => {
    this.setState({ isEdit: false, alert: false });
    this.props.actions.fetchDetailsActions(this.state.id);
  };

  alert = () => {
    if (this.state.alert) {
      return (
        <Alert
          alertClassName="success"
          faIcon="fa-check-circle"
          alertCross={false}
        >
          {'Your changes have been made successfully'}
        </Alert>
      );
    } else if (this.state.add && this.state.details.id) {
      return (
        <Alert
          alertClassName="success"
          faIcon="fa-check-circle"
          alertCross={false}
        >
          {`Successfully added new user. Registration email has been sent to ${
            this.state.details.email
          } `}
        </Alert>
      );
    }
  };

  renderCards = permissionRoles => {
    return (
      <div>
        {this.state.details.id ? (
          <div>
            {this.state.isEdit ? (
              <UserDetailEdit
                details={this.state.details}
                selectedPermissions={this.state.details.permissions}
                onCancel={this.onCancel}
                onSave={this.onSaveDetails}
                onStatusChange={this.onStatusChange('enabled')}
                onRoleChange={this.onRoleChange}
                disableActionBtn={this.state.disableActionBtn}
                permissionsList={permissionRoles}
                officesList={this.props.officesList}
              />
            ) : (
              <div>
                <div>
                  <UserDetailShow
                    details={this.state.details}
                    onEdit={this.onEditClick}
                    permissionsList={permissionRoles}
                    officesList={this.props.officesList}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <Cards>
            <span>{'Loading.....'}</span>
          </Cards>
        )}
      </div>
    );
  };

  render() {
    const {
      dashboardUrl,
      userListUrl,
      userListClickHandler,
      dashboardClickHandler,
      permissionRoles,
      addUserError,
    } = this.props;
    return (
      <div>
        <PageHeader pageTitle="User Profile" button="" />
        <div className="container">
          <div className="col-md-12">
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
            {this.alert()}
            <ErrorMessage error={addUserError} />
          </div>
          {this.renderCards(permissionRoles)}
        </div>
      </div>
    );
  }
}

AddUserDetail.propTypes = {
  details: PropTypes.object,
  dashboardUrl: PropTypes.string,
  userListUrl: PropTypes.string,
  userListClickHandler: PropTypes.func,
  dashboardClickHandler: PropTypes.func,
  permissionRoles: PropTypes.array,
  actions: PropTypes.object,
  id: PropTypes.any,
  addUserError: PropTypes.object,
  officesList: PropTypes.array,
};

AddUserDetail.defaultProps = {
  userListUrl: '/',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
  officesList: [],
};
