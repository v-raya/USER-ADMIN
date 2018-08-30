import { connect } from 'react-redux';
import UserDetail from '../views/userDetail/UserDetail';
import {
  selectDetailRecords,
  permissionsList,
  checkEditDisableBtn,
} from '../selectors/detailSelector';
import { fetchDetailsActions, clearDetails } from '../actions/detailActions';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    details: selectDetailRecords(state),
    permissionsList: permissionsList(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
    disableEditBtn: checkEditDisableBtn(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchDetailsActions,
    fetchPermissionsActions,
    clearDetails,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);
