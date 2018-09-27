import { connect } from 'react-redux';
import UserDetail from '../views/userDetail/UserDetail';
import {
  selectDetailRecords,
  permissionsList,
  checkEditDisabledBtn,
} from '../selectors/detailSelector';
import {
  fetchDetailsActions,
  clearDetails,
  saveUserDetailsActions,
} from '../actions/detailActions';
import { resendEmail } from '../selectors/resendEmailSelector';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { resendRegistrationEmailActions } from '../actions/resendRegistrationEmailActions';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    details: selectDetailRecords(state),
    permissionsList: permissionsList(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
    disableEditBtn: checkEditDisabledBtn(state),
    userDetailError: state.saveUserDetails.error,
    resendEmailStatus: resendEmail(state),
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchDetailsActions,
    fetchPermissionsActions,
    clearDetails,
    saveUserDetailsActions,
    resendRegistrationEmailActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);
