import { combineReducers } from 'redux';
import userList from './userListReducers';
import fetchDetails from './detailsReducers';
import fetchPermissions from './permissionsReducers';
import fetchOffices from './officesReducers';
import validateNewUser from './validateNewUserReducer';
import addUser from './addUserReducers';
import resendRegistrationEmail from './resendRegistrationEmailReducers';
import fetchRoles from './rolesReducers';
const reducer = combineReducers({
  userList,
  fetchDetails,
  fetchPermissions,
  fetchOffices,
  validateNewUser,
  addUser,
  resendRegistrationEmail,
  fetchRoles,
});

export default reducer;
