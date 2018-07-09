import { connect } from 'react-redux';
import AddUserDetail from '../views/addUser/addUserDetails';
import {
  selectDetailRecords,
  permissionsList,
} from '../selectors/detailSelector';
import { createUserActions } from '../actions/createUserActions';
import { fetchDetailsActions } from '../actions/detailActions';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { selectCreateUserRecords } from '../selectors/createUserSelector';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    id: selectCreateUserRecords(state),
    permissionRoles: permissionsList(state),
    details: selectDetailRecords(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    createUserActions,
    fetchPermissionsActions,
    fetchDetailsActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUserDetail);
