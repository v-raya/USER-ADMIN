import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Link as LinkRWD, Alert, PageHeader } from 'react-wood-duck';
import UserDetailEdit from './UserDetailEdit';
import UserDetailShow from './UserDetailShow';
import ErrorMessage from '../../common/ErrorMessage';

/* eslint camelcase: 0 */
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      alert: false,
      disableActionBtn: true,
      details: props.details,
      resendEmailAlert: false,
      disableEditBtn: props.disableEditBtn,
      disableErrorAlert: false,
    };
  }

  componentDidMount() {
    this.props.actions.fetchDetailsActions(
      this.getUserId(this.currentPathname())
    );
    this.props.actions.fetchPermissionsActions();
  }

  componentWillUnmount() {
    this.props.actions.clearDetails();
  }

  currentPathname() {
    return window.location.pathname;
  }

  getUserId(pathname) {
    const pathArray = pathname.split('/');
    const id = pathArray[pathArray.length - 1];
    return id;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

  onResendInvite = () => {
    this.props.actions.resendRegistrationEmailActions(this.state.details.email);
    this.setState({ resendEmailAlert: true });
  };

  onSaveDetails = () => {
    const id = this.getUserId(this.currentPathname());
    const { details } = this.state;
    this.props.actions.saveUserDetailsActions(id, details);
    this.setState({
      isEdit: false,
      alert: true,
      resendEmailAlert: false,
      disableErrorAlert: true,
    });
  };

  onEditClick = () => {
    this.setState({
      isEdit: true,
      alert: false,
      disableActionBtn: true,
    });
  };

  onCancel = () => {
    this.setState({ isEdit: false, alert: false, resendEmailAlert: false });
    this.props.actions.fetchDetailsActions(
      this.getUserId(this.currentPathname())
    );
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
    }
  };

  emailSent = () => {
    if (
      this.state.resendEmailAlert &&
      this.props.resendEmailStatus === 'Success'
    ) {
      return (
        <Alert
          alertClassName="success"
          faIcon="fa-check-circle"
          alertCross={false}
        >
          {'Registration email has been sent successfully'}
        </Alert>
      );
    }
  };

  renderCards = permissionsList => {
    return (
      <div>
        {this.state.details && this.state.details.id ? (
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
                permissionsList={permissionsList}
                onResendInvite={this.onResendInvite}
                disableResendEmailButton={this.props.disableResendEmailButton}
                officesList={this.props.officesList}
              />
            ) : (
              <UserDetailShow
                details={this.state.details}
                onEdit={this.onEditClick}
                permissionsList={permissionsList}
                disableEditBtn={this.props.disableEditBtn}
                officesList={this.props.officesList}
              />
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  render() {
    const {
      dashboardUrl,
      dashboardClickHandler,
      permissionsList,
      userDetailError,
    } = this.props;

    return (
      <div>
        <PageHeader pageTitle="User Profile" button="" />
        <div className="container">
          <div className="col-md-12">
            Back to:{' '}
            <LinkRWD
              text="Dashboard"
              href={dashboardUrl}
              clickHandler={dashboardClickHandler}
            />
            &nbsp;&gt;&nbsp;
            <Link to="/">User List</Link>
            {/* {this.alert()} */}
            {this.emailSent()}
            {this.state.disableErrorAlert &&
              userDetailError && <ErrorMessage error={userDetailError} />}
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
  dashboardClickHandler: PropTypes.func,
  permissionsList: PropTypes.array,
  actions: PropTypes.object.isRequired,
  userDetailError: PropTypes.object,
  resendEmailStatus: PropTypes.string,
  disableResendEmailButton: PropTypes.bool,
  disableEditBtn: PropTypes.bool,
  officesList: PropTypes.arrayOf(
    PropTypes.shape({
      office_name: PropTypes.string.isRequired,
      office_id: PropTypes.string.isRequired,
    })
  ),
};

UserDetail.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
