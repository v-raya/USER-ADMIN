import React from 'react';
import ReactDOM from 'react-dom';
import DetailsPage from './detailsPage';
import { store } from '../store/configureStore';
import { Provider } from 'react-redux';

const list = document.getElementById('root');

export class DetailsApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DetailsPage />
      </Provider>
    );
  }
}

DetailsApp.propTypes = {};

ReactDOM.render(<DetailsApp />, list);
