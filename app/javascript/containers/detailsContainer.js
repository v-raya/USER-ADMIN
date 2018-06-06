import { connect } from 'react-redux';
import Details from '../views/userDetail/UserDetail.jsx';
import {
  selectDetailRecords,
  permissionsList,
} from '../selectors/detailSelector';

const mapStateToProps = state => {
  return {
    userList: selectDetailRecords(state),
    permissionsList: permissionsList(state),
  };
};

export default connect(mapStateToProps)(Details);
