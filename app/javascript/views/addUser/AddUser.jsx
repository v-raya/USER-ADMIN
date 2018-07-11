import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddVerifiedUser from './AddVerifiedUser';
import VerifyUser from './VerifyUser';
import { Link, PageHeader } from 'react-wood-duck';
import AddUserDetail from '../../containers/addUserDetailsContainer';

/* eslint camelcase: 0 */
export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: false,
      racfid: '',
      email: '',
      disableActionBtn: true,
      addUser: props.addUser,
      verifyNewUserDetails: props.verifyNewUserDetails,
      details: props.details,
    };
  }

  componentWillReceiveProps(nextProps) {
    let verifyNewUserDetails = nextProps.verifyNewUserDetails;
    let id = nextProps.id;
    let permissionRoles = nextProps.permissionRoles;
    let details = nextProps.details;
    this.setState({ verifyNewUserDetails, id, details, permissionRoles });
  }

  handleEmail = event => {
    this.setState({ email: event.target.value });
    if (event.target.value !== '' && this.state.racfid !== '') {
      this.setState({ disableActionBtn: false });
    } else {
      this.setState({ disableActionBtn: true });
    }
  };

  handleRacfid = event => {
    this.setState({ racfid: event.target.value });
    if (event.target.value !== '' && this.state.email !== '') {
      this.setState({ disableActionBtn: false });
    } else {
      this.setState({ disableActionBtn: true });
    }
  };

  onVerify = () => {
    const { email, racfid } = this.state;
    this.props.actions.fetchPermissionsActions();
    this.props.actions.validateNewUserActions(email, racfid);
    this.setState({ verify: true });
  };

  verifyUser = () => {
    if (this.state.addUser) {
      return (
        <VerifyUser
          onVerify={this.onVerify}
          handleEmailChange={this.handleEmail}
          handleRacfChange={this.handleRacfid}
          disableActionBtn={this.state.disableActionBtn}
        />
      );
    }
  };

  addUser = () => {
    if (this.state.verify) {
      return (
        <AddVerifiedUser
          verifyNewUserDetails={this.state.verifyNewUserDetails}
          onSave={this.onAddUser}
        />
      );
    }
  };

  onAddUser = () => {
    this.props.actions.addUserActions(this.state.verifyNewUserDetails.user);
    this.setState({ addUser: false, verify: false });
  };

  render() {
    const {
      dashboardUrl,
      userListUrl,
      userListClickHandler,
      dashboardClickHandler,
    } = this.props;
    return this.state.addUser ? (
      <div>
        <PageHeader pageTitle="Add User" button="" />
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
          </div>
          {this.verifyUser()}
          {this.addUser()}
        </div>
      </div>
    ) : (
      <div>
        <AddUserDetail />
      </div>
    );
  }
}

AddUser.propTypes = {
  dashboardUrl: PropTypes.string,
  userListUrl: PropTypes.string,
  userListClickHandler: PropTypes.func,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object,
  verifyNewUserDetails: PropTypes.object,
  addUser: PropTypes.bool,
  id: PropTypes.string,
  permissionRoles: PropTypes.any,
  details: PropTypes.any,
};

AddUser.defaultProps = {
  userListUrl: '/',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
