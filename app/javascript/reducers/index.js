import { combineReducers } from 'redux';
import userList from './userListReducers';
import fetchDetails from './detailsReducers';
import fetchAccount from './accountReducers';
import fetchPermissions from './permissionsReducers';
import fetchOffices from './officesReducers';
import validateNewUser from './validateNewUserReducer';
import addUser from './addUserReducers';
import saveUserDetails from './saveUserDetailsReducers';
import resendRegistrationEmail from './resendRegistrationEmailReducers';
import fetchRoles from './rolesReducers';
const reducer = combineReducers({
  userList,
  fetchDetails,
  fetchAccount,
  fetchPermissions,
  fetchOffices,
  validateNewUser,
  addUser,
  saveUserDetails,
  resendRegistrationEmail,
  fetchRoles,
});

export default reducer;
