import { connect } from 'react-redux';
import UserDetail from '../views/userDetail/UserDetail.jsx';
import * as actionTypes from '../actions/actionTypes';
import { selectUserDetailRecords } from '../selectors/userDetailSelector';

const mapStateToProps = state => {
  console.log(selectUserDetailRecords(state));
  return {
    // userList: selectUserRecords(state),

    userDetails: selectUserDetailRecords(state),
  };
};

const mapDispatchToProps = dispatch => {
  dispatch(
    // { type: actionTypes.FETCH_USERS_API_CALL_REQUEST },
    { type: actionTypes.FETCH_USER_DETAILS_API_CALL_REQUEST }
  );
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  // UsersList,
  UserDetail
);
