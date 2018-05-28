import { connect } from 'react-redux';
import UsersList from '../views/usersList/UsersList.jsx';
import * as actionTypes from '../actions/actionTypes';
import { selectUserRecords, selectCounty } from '../selectors/userListSelector';

const componentDidMount = () => {
  //this.fetchUser();
  //this.fetchAccount();
};

const mapStateToProps = state => {
  return {
    userList: selectUserRecords(state),
    account_county: selectCounty(state),
    userListUrl: '/#',
    dashboardUrl: '/',
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
