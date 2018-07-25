import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersList from '../views/usersList/UsersList';
import {
  searchUsers,
  setPage,
  setPageSize,
  setSort,
  setSearch,
  setNextSearch,
} from '../actions/userListActions';
import { fetchAccountActions } from '../actions/accountActions';
import { selectCounty } from '../selectors/accountSelectors';

function mapStateToProps(state) {
  const { userList } = state;
  return {
    userList: userList.users || [],
    accountCounty: selectCounty(state),
    fetching: userList.fetching,
    userListUrl: '/#',
    dashboardUrl: '/',
    size: userList.size,
    from: userList.from,
    sort: userList.sort,
    query: userList.query,
    nextSearch: userList.nextSearch,
    aggregate: userList.aggregate,
    total: userList.total,
    error: userList.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        searchUsers,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
