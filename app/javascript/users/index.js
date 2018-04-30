import React from 'react';
import ReactDOM from 'react-dom';
import Cognito from './users.jsx';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers/reducers';
import watcherSaga from '../sagas/sagas';


const cognito = document.getElementById('root');
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(watcherSaga);

// ReactDOM.render(<Provider store={store}>
//     <Cognito />
//   </Provider>, cognito);



  ReactDOM.render(
  <Provider store={store}>
    <Cognito />
  </Provider>,
  cognito
);
