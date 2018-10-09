import { connect } from 'react-redux';
import AddUserDetail from '../views/addUser/AddUserDetail';
import {
  selectDetailRecords,
  permissionsList,
  rolesList,
} from '../selectors/detailSelector';
import { addUserActions } from '../actions/addUserActions';
import {
  fetchDetailsActions,
  saveUserDetailsActions,
} from '../actions/detailActions';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { fetchRolesActions } from '../actions/rolesActions';
import { addUserRecords } from '../selectors/addUserSelector';
import { bindActionCreators } from 'redux';
import { officesList } from '../selectors/userListSelector';

function mapStateToProps(state) {
  return {
    id: addUserRecords(state),
    permissionRoles: permissionsList(state),
    rolesList: rolesList(state),
    details: selectDetailRecords(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
    addUserError: state.addUser.error,
    officesList: officesList(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    addUserActions,
    fetchPermissionsActions,
    fetchRolesActions,
    fetchDetailsActions,
    saveUserDetailsActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserDetail);
