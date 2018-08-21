import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader } from 'react-wood-duck';

export default class HeaderComponent extends React.Component {
  logoutCallback = () => {
    window.location.href = '/logout';
  };

  render() {
    return (
      <div>
        <GlobalHeader
          profileName={this.props.fullName}
          logoutCallback={this.logoutCallback}
        />
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  fullName: PropTypes.string,
};
