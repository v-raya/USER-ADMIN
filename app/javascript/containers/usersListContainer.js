import { connect } from 'react-redux';
import UsersList from '../views/usersList/UsersList.jsx';
import * as actionTypes from '../actions/actionTypes';
import { selectUserRecords, handleClick } from '../selectors/userListSelector';

const mapStateToProps = state => {
  return {
    userList: selectUserRecords(state),
    handleClick: handleClick(),
    userListUrl: '/#',
    dashboardUrl: '/',
  };
};

const mapDispatchToProps = dispatch => {
  dispatch({ type: actionTypes.FETCH_USERS_API_CALL_REQUEST });
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
