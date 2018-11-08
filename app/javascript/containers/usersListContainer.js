import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UsersList from '../views/usersList/UsersList';
import {
  searchUsers,
  setPage,
  setPageSize,
  setSort,
  setSearch,
  handleSearchChange,
  fetchAccountActions,
} from '../actions/userListActions';
import { fetchOfficesActions } from '../actions/officesActions';
import { fetchRolesActions } from '../actions/rolesActions';
import { officesList, checkOfficeNames } from '../selectors/userListSelector';
import { rolesList } from '../selectors/rolesListSelector';
import { clearAddedUserDetailActions } from '../actions/addUserActions';

function mapStateToProps(state) {
  const { userList } = state;
  return {
    userList: userList.users || [],
    countyName: userList.countyName,
    fetching: userList.fetching,
    userListUrl: '/#',
    dashboardUrl: '/',
    size: userList.size,
    from: userList.from,
    sort: userList.sort,
    query: userList.query,
    aggregate: userList.aggregate,
    total: userList.total,
    error: userList.error,
    officesList: officesList(state),
    inputData: userList.inputData,
    lastName: userList.inputData.lastName,
    officeNames: checkOfficeNames(userList.inputData.officeNames),
    rolesList: rolesList(state),
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
        fetchOfficesActions,
        handleSearchChange,
        fetchRolesActions,
        clearAddedUserDetailActions,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
