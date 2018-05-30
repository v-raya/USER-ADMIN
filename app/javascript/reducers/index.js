import { combineReducers } from 'redux';
import fetchUserList from './userListReducers';
import fetchDetails from './detailsReducers';
import fetchAccount from './accountReducers';

const reducer = combineReducers({
  fetchUserList,
  fetchDetails,
  fetchAccount,
});

export default reducer;
