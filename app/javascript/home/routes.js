import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './app';
import UsersList from '../containers/usersListContainer';
import DetailsPage from '../containers/detailsContainer';
import { store } from '../store/configureStore';
import { Provider } from 'react-redux';

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={UsersList} />
        <Route path="user_details/:id" component={DetailsPage} />
      </Route>
    </Router>
  </Provider>
);
