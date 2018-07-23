import { connect } from 'react-redux';
import UserDetail from '../views/userDetail/UserDetail';
import {
  selectDetailRecords,
  permissionsList,
} from '../selectors/detailSelector';
import { fetchDetailsActions } from '../actions/detailActions';
import { fetchPermissionsActions } from '../actions/permissionsActions';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    details: selectDetailRecords(state),
    permissionsList: permissionsList(state),
    userListUrl: process.env.RAILS_RELATIVE_URL_ROOT
      ? process.env.RAILS_RELATIVE_URL_ROOT
      : '/',
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchDetailsActions,
    fetchPermissionsActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);
