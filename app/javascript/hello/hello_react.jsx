import React from 'react';
import PropTypes from 'prop-types';

class Cognito extends React.Component {
  render() {
    return <h1>{this.props.name}</h1>;
  }
}
Cognito.propTypes = {
  name: PropTypes.string,
};
Cognito.defaultProps = {
  name: 'Hello Cognito App User!',
};
export default Cognito;
