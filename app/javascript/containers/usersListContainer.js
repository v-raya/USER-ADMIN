import { connect } from 'react-redux';
import UsersList from '../views/usersList/UsersList.jsx';
import * as actionTypes from '../actions/actionTypes';
import { selectUserRecords } from '../selectors/userListSelector';

const fetchUser = () => {
  console.log('fetching account');
  this.setState({ XHRStatus: 'waiting' });
  return AccountService.fetchCurrent()
    .then(this.onFetchSuccess)
    .catch(() => this.setState({ XHRStatus: 'error' }));
};

const onFetchSuccess = staffPerson => {
  console.log('on fetch succeee', staffPerson);
  this.setState({
    XHRStatus: 'ready',
    user: {
      user: staffPerson,
    },
  });
  console.log('Got the account', staffPerson);
};

const componentDidMount = () => {
  //this.fetchUser();
  console.log('componenr did mount');
};

const mapStateToProps = state => {
  return {
    userList: selectUserRecords(state),
    userListUrl: '/#',
    dashboardUrl: '/',
  };
};

const mapDispatchToProps = dispatch => {
  dispatch({ type: actionTypes.FETCH_USERS_API_CALL_REQUEST });
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
