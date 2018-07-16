import { combineReducers } from 'redux';
import userList from './userListReducers';
import fetchDetails from './detailsReducers';
import fetchAccount from './accountReducers';
import fetchPermissions from './permissionsReducers';
import validateNewUser from './validateNewUserReducer';
import addUser from './addUserReducers';
const reducer = combineReducers({
  userList,
  fetchDetails,
  fetchAccount,
  fetchPermissions,
  validateNewUser,
  addUser,
});

export default reducer;
