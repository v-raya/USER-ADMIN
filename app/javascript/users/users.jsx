import { connect } from 'react-redux';
import * as actionTypes from '../constants/actionTypes';
import { selectUserRecords } from '../store/selectors.js';


// import React from 'react';
// import PropTypes from 'prop-types';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import {
//   Cards,
//   DropDownField,
//   DateTimePicker,
//   TextArea,
//   Button,
// } from 'react-wood-duck';
// // import { REASONS, COUNTY_LIST } from './Constants';

// const USER = [
//   { value: 'Mr.', label: 'Mr.' },
//   { value: 'Mrs.', label: 'Mrs.' },
//   { value: 'Miss', label: 'Miss' },
//   { value: 'Ms.', label: 'Ms.' },
//   { value: 'Dr.', label: 'Dr.' },
//   { value: 'Rev.', label: 'Rev.' },
// ];

// export class UserRecord extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userList: props.userList,
//       addAlert: false,
//     };
//   }

//   onClick = () => {
//     const { addAlert } = this.state;
//     this.setState({ addAlert: !addAlert });
//   };

//   componentWillReceiveProps(nextProps) {
//     let userList = nextProps.userList;
//     this.setState({ userList });
//   }

//   render() {
//     const { userList } = this.state;
//     return (
//     <div>
//      <DropDownField
//                       id="dropdown1"
//                       options={USER}
//                       label="County"
//                     />
//     {this.state.userList}
//     </div>
//     );
//   }
// }


// const mapStateToProps = state => {
//   return {
//     userList: selectUserRecords(state),
//   };
// };

// const mapDispatchToProps = dispatch => {
//   dispatch({ type: actionTypes.FETCH_USERS_API_CALL_REQUEST });
//   return {};
// };

// UserRecord.propTypes = {
//   userList: PropTypes.array,
// };
// export default connect(mapStateToProps, mapDispatchToProps)(UserRecord);


import React from 'react';
import PropTypes from 'prop-types';
import countyUsersList from '../sagas/sagas.js'


class Cognito extends React.Component {
  render()

   {
   	  	// console.log("saga:" + countyUsersList().userList);
    return <h1>Name: {this.props.name}
    <div>
redux Response: {this.props.userList}
</div>
    </h1>;

  }
}
Cognito.propTypes = {
  name: PropTypes.string,
  userList: PropTypes.string,
};
Cognito.defaultProps = {
  name: 'Hello Cognito App User!',

};

// export default Cognito;



const mapStateToProps = state => {
	console.log("state", state.fetchUserList.userList);
  return {
    userList: selectUserRecords(state),
  };
};

const mapDispatchToProps = dispatch => {
  dispatch({ type: actionTypes.FETCH_USERS_API_CALL_REQUEST });
  // console.log("check:" + dispatch);
  return {};
};

// Cognito.propTypes = {
//   userList: PropTypes.array,
// };
export default connect(mapStateToProps, mapDispatchToProps)(Cognito);







