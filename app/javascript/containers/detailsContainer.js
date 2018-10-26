import { connect } from 'react-redux';
import UserDetail from '../views/userDetail/UserDetail';
import {
  selectDetailRecords,
  checkEditDisable,
  permissionsList,
  possibleRoles,
  rolesList,
  fetchingStatus,
} from '../selectors/detailSelector';
import {
  fetchDetailsActions,
  saveUserDetailsActions,
  clearDetails,
  handleDropdownChangeAction,
} from '../actions/detailActions';
import {
  selectResendEmailStatus,
  disableResendEmailButton,
} from '../selectors/resendEmailSelector';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { fetchRolesActions } from '../actions/rolesActions';
import { resendRegistrationEmailActions } from '../actions/resendRegistrationEmailActions';
import { bindActionCreators } from 'redux';
import { officesList } from '../selectors/userListSelector';
import { addUserRecords } from '../selectors/addUserSelector';
import { clearAddedUserDetailActions } from '../actions/addUserActions';

function mapStateToProps(state) {
  return {
    id: addUserRecords(state),
    XHRStatus: fetchingStatus(state),
    possibleRoles: possibleRoles(state),
    disableEditBtn: checkEditDisable(state),
    details: selectDetailRecords(state),
    permissionsList: permissionsList(state),
    rolesList: rolesList(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
    userDetailError: state.saveUserDetails.error,
    resendEmailStatus: selectResendEmailStatus(state),
    disableResendEmailButton: disableResendEmailButton(state),
    officesList: officesList(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchDetailsActions,
    fetchPermissionsActions,
    fetchRolesActions,
    saveUserDetailsActions,
    resendRegistrationEmailActions,
    clearDetails,
    clearAddedUserDetailActions,
    handleDropdownChangeAction,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);
