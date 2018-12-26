import { connect } from 'react-redux'
import AddUser from '../views/addUser/AddUser'
import { validateNewUserActions } from '../actions/validateNewUserActions'
import { addUserActions, clearAddedUserDetailActions } from '../actions/addUserActions'
import { selectNewUserRecords, officeName, formattedPhoneNumber } from '../selectors/validateNewUserSelector'
import { addUserRecords } from '../selectors/addUserSelector'
import { bindActionCreators } from 'redux'
import { permissionsList } from '../selectors/permissionsListSelector'
import { fetchPermissionsActions } from '../actions/permissionsActions'

function mapStateToProps(state) {
  return {
    verifyNewUserDetails: selectNewUserRecords(state),
    permissionRoles: permissionsList(state),
    id: addUserRecords(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT ? process.env.RAILS_RELATIVE_URL_ROOT : '/',
    dashboardUrl: '/',
    validateNewUserError: state.validateNewUser.error,
    officeName: officeName(state),
    officePhoneNumber: formattedPhoneNumber(state),
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    validateNewUserActions,
    addUserActions,
    fetchPermissionsActions,
    clearAddedUserDetailActions,
  }
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser)
