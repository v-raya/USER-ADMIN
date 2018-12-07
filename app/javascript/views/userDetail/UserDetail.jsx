import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Link as LinkRWD, Alert, PageHeader } from 'react-wood-duck'
import UserDetailEdit from './UserDetailEdit'
import UserDetailShow from './UserDetailShow'
import ErrorMessage from '../../common/ErrorMessage'
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
    const { details, isRolesDisabled, match, actions } = this.props
    actions.saveUserDetailsActions(match.params.id, details, isRolesDisabled)
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

  showAlert = (displayAlert, userDetailError) => {
    if (displayAlert) {
      if (userDetailError) {
        return <ErrorMessage error={userDetailError} />
      } else {
        return (
          <Alert alertClassName="success" faIcon="fa-check-circle" alertCross={false}>
            {'Your changes have been made successfully'}
          </Alert>
        )
      }
    }
    return null
  }

  showAddAlert = () => {
    if (this.props.id) {
      return (
        <Alert alertClassName="success" faIcon="fa-check-circle" alertCross={false}>
          {`Successfully added new user. Registration email has been sent to ${this.props.details.email} `}
        </Alert>
      )
    }
    return null
  }

  emailSent = () => {
    if (this.state.resendEmailAlert && this.props.resentRegistrationEmailDateTime) {
      return (
        <Alert alertClassName="success" faIcon="fa-check-circle" alertCross={false}>
          {'Registration email has been sent successfully'}
        </Alert>
      )
    }
    return null
  }

  renderCards = (
    possiblePermissionsList,
    XHRStatus,
    details,
    disableResendEmailButton,
    rolesList,
    possibleRolesList,
    isRolesDisabled,
    disableActionBtn,
    disableEditBtn,
    accountStatus,
    assignedPermissions,
    startDate,
    userStatusDescription,
    userStatus,
    officeName,
    resentRegistrationEmailDateTime
  ) => {
    return XHRStatus !== 'ready' ? (
      <Cards>
        <span>{'Loading...'}</span>
      </Cards>
    ) : (
      <div>
        {details && details.id ? (
          <div>
            {this.props.isEdit ? (
              <UserDetailEdit
                details={details}
                selectedPermissions={details.permissions}
                onCancel={this.onCancel}
                onSave={this.onSaveDetails}
                onDropDownChange={this.handleDropDownChange}
                disableActionBtn={disableActionBtn}
                onResendInvite={this.onResendInvite}
                disableResendEmailButton={disableResendEmailButton}
                rolesList={rolesList}
                possibleRolesList={possibleRolesList}
                isRolesDisabled={isRolesDisabled}
                startDate={startDate}
                userStatusDescription={userStatusDescription}
                userStatus={userStatus}
                officeName={officeName}
                resentRegistrationEmailDateTime={resentRegistrationEmailDateTime}
                possiblePermissionsList={possiblePermissionsList}
              />
            ) : (
              <UserDetailShow
                details={details}
                onEdit={this.onEditClick}
                disableEditBtn={disableEditBtn}
                rolesList={rolesList}
                startDate={startDate}
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
              <Cards cardHeaderText={'User not found'} cardHeaderButton={false} disabled={this.props.disableEditBtn} />
            </div>
          </div>
        )}
      </div>
    )
  }

  render() {
    const {
      dashboardUrl,
      dashboardClickHandler,
      possiblePermissionsList,
      XHRStatus,
      details,
      disableResendEmailButton,
      rolesList,
      possibleRolesList,
      isRolesDisabled,
      userDetailError,
      displayAlert,
      disableActionBtn,
      disableEditBtn,
      accountStatus,
      assignedPermissions,
      startDate,
      userStatusDescription,
      userStatus,
      officeName,
      resentRegistrationEmailDateTime,
    } = this.props
    return (
      <div>
        <PageHeader pageTitle="User Profile" button="" />
        <div className="container">
          <div className="col-md-12">
            Back to: <LinkRWD text="Dashboard" href={dashboardUrl} clickHandler={dashboardClickHandler} />
            &nbsp;&gt;&nbsp;
            <Link to="/">User List</Link>
            {this.showAlert(displayAlert, userDetailError)}
            {this.emailSent()}
            {this.showAddAlert()}
          </div>
          {this.renderCards(
            possiblePermissionsList,
            XHRStatus,
            details,
            disableResendEmailButton,
            rolesList,
            possibleRolesList,
            isRolesDisabled,
            disableActionBtn,
            disableEditBtn,
            accountStatus,
            assignedPermissions,
            startDate,
            userStatusDescription,
            userStatus,
            officeName,
            resentRegistrationEmailDateTime
          )}
        </div>
      </div>
    )
  }
}

UserDetail.propTypes = {
  isEdit: PropTypes.bool,
  details: PropTypes.object,
  assignedPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  actions: PropTypes.object.isRequired,
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
  rolesList: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  officeName: PropTypes.string,
  isRolesDisabled: PropTypes.bool,
  displayAlert: PropTypes.bool,
  disableActionBtn: PropTypes.bool,
  match: PropTypes.object,
}

UserDetail.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
}
