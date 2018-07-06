import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddVerifiedUser from './AddVerifiedUser';
import VerifyUser from './VerifyUser';
import { Link, PageHeader } from 'react-wood-duck';
import UserDetail from './addUserDetails';

// import UserService from '../../_services/users';
/* eslint camelcase: 0 */
export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addUser: props.addUser,
      add: false,
      verify: false,
      confirm: false,
      racfid: '',
      email: '',
      disableActionBtn: true,
      verifyNewUserDetails: props.verifyNewUserDetails,
      createUserDetails: props.createUserDetails,
      details: props.details,
      permissionsList: props.permissionsList,

      // addUsers: {
      //   XHRStatus: '',
      //   records: undefined,
      // },
    };
  }

  componentWillReceiveProps(nextProps) {
    let verifyNewUserDetails = nextProps.verifyNewUserDetails;
    let createUserDetails = nextProps.createUserDetails;
    let details = nextProps.details;
    this.setState({ verifyNewUserDetails, createUserDetails, details });
    // this.fetchIndianAncestryData();
  }

  handleEmail = event => {
    this.setState({ email: event.target.value });
    if (event.target.value !== '' && this.state.racfid !== '') {
      this.setState({ disableActionBtn: false });
    } else {
      this.setState({ disableActionBtn: true });
    }
  };

  // fetchIndianAncestryData = () => {
  // const newUser = {
  //   email: 'kevinfs@gmail.com',
  //   first_name: 'User1asdfasd',
  //   last_name: 'Two1asfdasdf',
  //   county_name: 'Madera',
  //   racfid: 'POPSOPS',
  //   enabled: true,
  //   status: 'FORCE_CHANGE_PASSWORD',
  // };
  //   this.setState({ addUsers: { XHRStatus: 'waiting' } });
  //   return UserService.createUser(newUser)
  //     .then(addUsers => {
  //       this.setState({
  //         addUsers: {
  //           XHRStatus: 'ready',
  //           records: addUsers,
  //         },
  //       });
  //     })
  //     .catch(() => this.setState({ indianAncestry: { XHRStatus: 'error' } }));
  // };

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
    this.props.actions.validateNewUserActions(email, racfid);
    this.setState({ verify: true, addUser: true });
  };

  onSave = () => {
    this.props.actions.createUserActions(this.state.verifyNewUserDetails.user);
    this.setState({ add: true, addUser: false, verify: false });

    this.props.actions.fetchPermissionsActions();
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

  fetchAddedUser() {
    this.props.actions.fetchDetailsActions(this.state.createUserDetails);
  }

  addNewUSer = () => {
    this.fetchAddedUser();
    if (this.state.add) {
      return (
        <UserDetail
          details={this.state.details}
          permissionsList={this.state.permissionsList}
        />
      );
    }
  };

  addUser = () => {
    if (this.state.verify) {
      return (
        <AddVerifiedUser
          verifyNewUserDetails={this.state.verifyNewUserDetails}
          onSave={this.onSave}
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
    console.log('details', this.state.details);
    console.log('details', this.state.createUserDetails);
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
      <div>{this.addNewUSer()}</div>
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
  createUserDetails: PropTypes.string,
  details: PropTypes.object,
  addUser: PropTypes.bool,
  permissionsList: PropTypes.array,
};

AddUser.defaultProps = {
  userListUrl: '/',
  dashboardUrl: '/',
  userListClickHandler: () => {},
  dashboardClickHandler: () => {},
};
