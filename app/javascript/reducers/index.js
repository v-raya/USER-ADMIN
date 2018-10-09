import { combineReducers } from 'redux';
import userList from './userListReducers';
import fetchDetails from './detailsReducers';
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
  fetchPermissions,
  fetchOffices,
  validateNewUser,
  addUser,
  saveUserDetails,
  resendRegistrationEmail,
  fetchRoles,
});

export default reducer;
