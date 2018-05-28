import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import { initSagas } from 'initSagas';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware } from 'redux';

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer /* preloadedState, */,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  initSagas(sagaMiddleware);
  window.store = store;
  return store;
}

export const store = configureStore();
