import { combineReducers } from 'redux';
import userList from './userListReducers';
import fetchDetails from './detailsReducers';
import fetchAccount from './accountReducers';
import fetchPermissions from './permissionsReducers';
import validateNewUser from './validateNewUserReducer';
import addUser from './addUserReducers';
import saveUserDetails from './saveUserDetailsReducers';
const reducer = combineReducers({
  userList,
  fetchDetails,
  fetchAccount,
  fetchPermissions,
  validateNewUser,
  addUser,
  saveUserDetails,
});

export default reducer;
