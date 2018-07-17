import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersList from '../views/usersList/UsersList';
// Actions
import {
  fetchUsersActions,
  setPage,
  setPageSize,
  setSort,
  setSearch,
  setNextSearch,
} from '../actions/userListActions';
import { fetchAccountActions } from '../actions/accountActions';
// Selectors
// import { selectUserRecords } from '../selectors/userListSelector';
import { selectCounty } from '../selectors/accountSelectors';

function mapStateToProps(state) {
  const { userList } = state;
  return {
    userList: userList.users || [],
    accountCounty: selectCounty(state),
    fetching: userList.fetching,
    userListUrl: '/#',
    dashboardUrl: '/',
    page: userList.page,
    pageSize: userList.pageSize,
    sort: userList.sort,
    query: userList.query,
    nextSearch: userList.nextSearch,
    aggregate: userList.aggregate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchUsersActions,
        fetchAccountActions,
        setPage,
        setPageSize,
        setSort,
        setSearch,
        setNextSearch,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
