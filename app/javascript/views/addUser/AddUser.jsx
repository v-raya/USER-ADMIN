import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddVerifiedUser from './AddVerifiedUser';
import VerifyUser from './VerifyUser';
import { Link, PageHeader } from 'react-wood-duck';

/* eslint camelcase: 0 */
export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify: false,
      confirm: false,
      racfid: '',
      email: '',
      disableActionBtn: true,
      verifyNewUserDetails: props.verifyNewUserDetails,
    };
  }

  componentWillReceiveProps(nextProps) {
    let verifyNewUserDetails = nextProps.verifyNewUserDetails;
    this.setState({ verifyNewUserDetails });
  }

  handleEmail = event =>
    this.setState({ email: event.target.value, disableActionBtn: false });

  handleRacfid = event =>
    this.setState({ racfid: event.target.value, disableActionBtn: false });

  onVerify = () => {
    const { email, racfid } = this.state;
    this.props.actions.validateNewUserActions(email, racfid);
    this.setState({ verify: true });
  };

  verifyUser = () => {
    return (
      <VerifyUser
        onVerify={this.onVerify}
        handleEmailChange={this.handleEmail}
        handleRacfChange={this.handleRacfid}
        disableActionBtn={this.state.disableActionBtn}
      />
    );
  };

  addUser = () => {
    if (this.state.verify) {
      return (
        <AddVerifiedUser
          verifyNewUserDetails={this.state.verifyNewUserDetails}
        />
      );
    }
  };

  render() {
    const {
      dashboardUrl,
      userListUrl,
      userListClickHandler,
      dashboardClickHandler,
    } = this.props;
    return (
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
};

AddUser.defaultProps = {
  userListUrl: '/',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
