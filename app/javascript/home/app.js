import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHeader } from 'react-wood-duck';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
};
