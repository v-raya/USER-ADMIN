import { combineReducers } from 'redux';
import fetchUserList from './userListReducers';
import fetchDetails from './detailsReducers';
import fetchAccount from './accountReducers';
import fetchPermissions from './permissionsReducers';

const reducer = combineReducers({
  fetchUserList,
  fetchDetails,
  fetchAccount,
  fetchPermissions,
});

export default reducer;
