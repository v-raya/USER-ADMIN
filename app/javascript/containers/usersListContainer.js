import { connect } from 'react-redux';
import UsersList from '../views/usersList/UsersList';
import { selectUserRecords, isLoading } from '../selectors/userListSelector';
import { selectCounty } from '../selectors/accountSelectors';
import { fetchUsersActions } from '../actions/userListActions';
import { fetchAccountActions } from '../actions/accountActions';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    userList: selectUserRecords(state),
    accountCounty: selectCounty(state),
    isLoading: isLoading(state),
    userListUrl: '/#',
    dashboardUrl: '/',
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchUsersActions,
    fetchAccountActions,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
