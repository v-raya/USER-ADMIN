import { connect } from 'react-redux';
import AddUser from '../views/addUser/AddUser';
import { validateNewUserActions } from '../actions/validateNewUserActions';
import { createUserActions } from '../actions/createUserActions';
import { selectNewUserRecords } from '../selectors/validateNewUserSelector';
import { selectCreateUserRecords } from '../selectors/createUserSelector';
import { bindActionCreators } from 'redux';
import { permissionsList } from '../selectors/detailSelector';
import { fetchPermissionsActions } from '../actions/permissionsActions';

function mapStateToProps(state) {
  return {
    verifyNewUserDetails: selectNewUserRecords(state),
    permissionRoles: permissionsList(state),
    id: selectCreateUserRecords(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
    dashboardUrl: '/',
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    validateNewUserActions,
    createUserActions,
    fetchPermissionsActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
