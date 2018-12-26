import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Link as LinkRWD, PageHeader } from 'react-wood-duck'
import UserDetailEdit from './UserDetailEdit'
import UserDetailShow from './UserDetailShow'
import UserMessage from '../../common/UserMessage'
import Cards from '../../common/Card'

/* eslint camelcase: 0 */
export default class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resendEmailAlert: false,
    }
  }

  componentDidMount() {
    this.props.actions.fetchDetailsActions(this.props.match.params.id)
    this.props.actions.fetchPermissionsActions()
    this.props.actions.fetchRolesActions()
  }

  componentWillUnmount() {
    this.props.actions.clearDetails()
  }

  onSaveDetails = () => {
    const { updatedDetails, match, actions } = this.props
    actions.saveUserDetailsActions(match.params.id, updatedDetails)
    this.setState({ resendEmailAlert: false })
    actions.clearAddedUserDetailActions()
  }

  onResendInvite = () => {
    this.props.actions.resendRegistrationEmailActions(this.props.details.id)
    this.props.actions.clearSaveAlert()
    this.setState({ resendEmailAlert: true })
  }

  onEditClick = () => {
    this.props.actions.handleEditButtonChangeAction(true)
  }

  onCancel = () => {
    this.props.actions.handleEditButtonChangeAction(false)
    this.props.actions.fetchDetailsActions(this.props.match.params.id)
    this.props.actions.clearAddedUserDetailActions()
    this.setState({ resendEmailAlert: false })
  }

  handleDropDownChange = (name, value) => {
    this.props.actions.handleDropdownChangeAction(name, value)
  }

  handleInputChange = value => {
    this.props.actions.handleEmailChangeAction(value)
  }

  showAlert = (displayAlert, userDetailError) => {
    if (displayAlert) {
      if (userDetailError) {
        return <UserMessage errorMsg={userDetailError} />
      } else {
        return <UserMessage successMsg={'Your changes have been made successfully'} />
      }
    }
    return null
  }

  showAddAlert = () => {
    if (this.props.id) {
      return (
        <UserMessage
          successMsg={`Successfully added new user. Registration email has been sent to ${this.props.details.email} `}
        />
      )
    }
    return null
  }

  emailSent = () => {
    if (this.state.resendEmailAlert && this.props.resentRegistrationEmailDateTime) {
      return <UserMessage successMsg={'Registration email has been sent successfully'} />
    }
    return null
  }

  renderCards = (
    possiblePermissionsList,
    details,
    disableResendEmailButton,
    possibleRolesList,
    rolesList,
    isRolesDisabled,
    disableActionBtn,
    disableEditBtn,
    accountStatus,
    assignedPermissions,
    startDate,
    userStatusDescription,
    userStatus,
    officeName,
    resentRegistrationEmailDateTime,
    isEmailValid
  ) => {
    return details && details.id ? (
      <div>
        {this.props.isEdit ? (
          <UserDetailEdit
            details={details}
            selectedPermissions={details.permissions}
            onCancel={this.onCancel}
            onSave={this.onSaveDetails}
            onDropDownChange={this.handleDropDownChange}
            onInputChange={this.handleInputChange}
            disableActionBtn={disableActionBtn}
            possibleRolesList={possibleRolesList}
            isRolesDisabled={isRolesDisabled}
            startDate={startDate}
            userStatusDescription={userStatusDescription}
            userStatus={userStatus}
            officeName={officeName}
            resentRegistrationEmailDateTime={resentRegistrationEmailDateTime}
            isEmailValid={isEmailValid}
            possiblePermissionsList={possiblePermissionsList}
          />
        ) : (
          <UserDetailShow
            details={details}
            onEdit={this.onEditClick}
            disableEditBtn={disableEditBtn}
            startDate={startDate}
            rolesList={rolesList}
            accountStatus={accountStatus}
            assignedPermissions={assignedPermissions}
            userStatus={userStatus}
            userStatusDescription={userStatusDescription}
            officeName={officeName}
            onResendInvite={this.onResendInvite}
            disableResendEmailButton={disableResendEmailButton}
            resentRegistrationEmailDateTime={resentRegistrationEmailDateTime}
          />
        )}
      </div>
    ) : (
      <div className="row">
        <div className="col-md-12">
          <Cards cardHeaderText="User not found" cardHeaderButton={false} disabled={this.props.disableEditBtn} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <PageHeader pageTitle="User Profile" button="" />
        <div className="container">
          <div className="col-md-12">
            Back to:{' '}
            <LinkRWD text="Dashboard" href={this.props.dashboardUrl} clickHandler={this.props.dashboardClickHandler} />
            &nbsp;&gt;&nbsp;
            <Link to="/">User List</Link>
            {this.showAlert(this.props.displayAlert, this.props.userDetailError)}
            {this.emailSent()}
            {this.showAddAlert()}
          </div>
          {this.props.fetchDetailsError ? (
            <UserMessage errorMsg={this.props.fetchDetailsError} />
          ) : this.props.XHRStatus !== 'ready' ? (
            <Cards>
              <span>{'Loading...'}</span>
            </Cards>
          ) : (
            this.renderCards(
              this.props.possiblePermissionsList,
              this.props.details,
              this.props.disableResendEmailButton,
              this.props.possibleRolesList,
              this.props.rolesList,
              this.props.isRolesDisabled,
              this.props.disableActionBtn,
              this.props.disableEditBtn,
              this.props.accountStatus,
              this.props.assignedPermissions,
              this.props.startDate,
              this.props.userStatusDescription,
              this.props.userStatus,
              this.props.officeName,
              this.props.resentRegistrationEmailDateTime,
              this.props.isEmailValid
            )
          )}
        </div>
      </div>
    )
  }
}

UserDetail.propTypes = {
  isEdit: PropTypes.bool,
  details: PropTypes.object,
  initialDetails: PropTypes.object,
  assignedPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
  fetchDetailsError: PropTypes.string,
  userDetailError: PropTypes.object,
  resentRegistrationEmailDateTime: PropTypes.string,
  disableResendEmailButton: PropTypes.bool,
  disableEditBtn: PropTypes.bool,
  XHRStatus: PropTypes.string,
  possibleRolesList: PropTypes.array,
  possiblePermissionsList: PropTypes.array,
  accountStatus: PropTypes.string,
  startDate: PropTypes.string,
  userStatusDescription: PropTypes.string,
  userStatus: PropTypes.string,
  officeName: PropTypes.string,
  isRolesDisabled: PropTypes.bool,
  rolesList: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  displayAlert: PropTypes.bool,
  disableActionBtn: PropTypes.bool,
  match: PropTypes.object,
  isEmailValid: PropTypes.bool,
  updatedDetails: PropTypes.object,
}

UserDetail.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
}
