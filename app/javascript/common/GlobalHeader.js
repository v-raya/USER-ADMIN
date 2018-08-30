import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader } from 'react-wood-duck';

export default class GlobalHeaderComponent extends React.Component {
  logoutCallback = () => {
    window.location.href = this.props.logoutUrl;
  };

  render() {
    return (
      <div>
        <GlobalHeader
          profileName={this.props.fullName}
          logoutUrl={this.props.logoutUrl}
          logoutCallback={this.logoutCallback}
        />
      </div>
    );
  }
}

GlobalHeaderComponent.propTypes = {
  fullName: PropTypes.string,
  logoutUrl: PropTypes.string,
};
