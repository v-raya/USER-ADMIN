import { combineReducers } from 'redux';
import fetchUserList from './userListReducers';
import fetchDetails from './detailsReducers';
import fetchAccount from './accountReducers';
import fetchPermissions from './permissionsReducers';
import validateNewUser from './validateNewUserReducer';
import createUser from './createUserReducer';
const reducer = combineReducers({
  fetchUserList,
  fetchDetails,
  fetchAccount,
  fetchPermissions,
  validateNewUser,
  createUser,
});

export default reducer;
