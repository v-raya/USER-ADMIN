import { combineReducers } from 'redux';
import fetchUserList from './userListReducers';
import fetchDetails from './detailsReducers';

const reducer = combineReducers({
  fetchUserList,
  fetchDetails,
});

export default reducer;
