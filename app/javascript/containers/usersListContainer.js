import { connect } from 'react-redux';
import UsersList from '../views/usersList/UsersList.jsx';
import { selectUserRecords, selectCounty } from '../selectors/userListSelector';

const mapStateToProps = state => {
  return {
    userList: selectUserRecords(state),
    accountCounty: selectCounty(state),
    userListUrl: '/#',
    dashboardUrl: '/',
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
