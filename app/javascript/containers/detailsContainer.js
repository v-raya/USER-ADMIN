import { connect } from 'react-redux';
import AddUserDetails from '../views/addUser/addUserDetails';
import {
  selectDetailRecords,
  permissionsList,
} from '../selectors/detailSelector';
import { createUserActions } from '../actions/createUserActions';
import { fetchDetailsActions } from '../actions/detailActions';
import { selectCreateUserRecords } from '../selectors/createUserSelector';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    details: selectDetailRecords(state),
    permissionsList: permissionsList(state),
    createUserSelector: selectCreateUserRecords(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchDetailsActions,
    fetchPermissionsActions,
    createUserActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUserDetails);
