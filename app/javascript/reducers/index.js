import { combineReducers } from 'redux';
import fetchUserList from './userListReducers';
import fetchUserDetails from './userDetailReducer';

const reducer = combineReducers({
  fetchUserList,
  fetchUserDetails,
});

export default reducer;
