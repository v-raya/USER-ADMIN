import { connect } from 'react-redux';
import AddUser from '../views/addUser/AddUser';
import { validateNewUserActions } from '../actions/validateNewUserActions';
import {
  selectDetailRecords,
  permissionsList,
} from '../selectors/detailSelector';
import { createUserActions } from '../actions/createUserActions';
import { fetchDetailsActions } from '../actions/detailActions';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { selectNewUserRecords } from '../selectors/validateNewUserSelector';
import { selectCreateUserRecords } from '../selectors/createUserSelector';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    verifyNewUserDetails: selectNewUserRecords(state),
    createUserDetails: selectCreateUserRecords(state),
    details: selectDetailRecords(state),
    permissionsList: permissionsList(state),
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
    fetchDetailsActions,
    fetchPermissionsActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
