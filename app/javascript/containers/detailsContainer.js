import { connect } from 'react-redux';
import UserDetails from '../views/userDetail/UserDetail';
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
  };
}

function mapDispatchToProps(dispatch) {
  const actions = { fetchDetailsActions, fetchPermissionsActions };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
