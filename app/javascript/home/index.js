import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import { store } from '../store/configureStore';
import { Provider } from 'react-redux';

const list = document.getElementById('root');

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

App.propTypes = {};

ReactDOM.render(<App />, list);
