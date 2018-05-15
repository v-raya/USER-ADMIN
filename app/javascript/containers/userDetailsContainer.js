import { connect } from 'react-redux';
import UserDetails from '../views/userDetail';
import { selectUserDetailRecords } from '../selectors/userDetailSelector';

const mapStateToProps = (state, id) => {
  return {
    userDetail: selectUserDetailRecords(state),
  };
};

export default connect(mapStateToProps, {})(UserDetails);
