import { connect } from 'react-redux';
import Details from '../views/userDetail/UserDetail.jsx';
// import * as actionTypes from '../actions/actionTypes';
import {
  selectDetailRecords,
  permissionsList,
} from '../selectors/detailSelector';

const mapStateToProps = state => {
  return {
    userList: selectDetailRecords(state),
    permissionsList: permissionsList(state),
  };
};

const mapDispatchToProps = dispatch => {
  // dispatch({ type: actionTypes.FETCH_DETAILS_API_CALL_REQUEST });
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
