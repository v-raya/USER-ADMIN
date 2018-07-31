import createSagaMiddleware from 'redux-saga';
import { initSagas } from '../initSagas';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware } from 'redux';
import { saveState, loadState } from '../_utils/sessionStore';
import { getSearchParams } from '../selectors/userListSelector';
import reducer from '../reducers';

export const store = configureStore();

if (process.env.ENABLE_SESSION_STORAGE_SYNC)
  observeStore(store, getSearchParams, () => saveState(store.getState()));

//
//
//

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const state = process.env.ENABLE_SESSION_STORAGE_SYNC
    ? { ...initialState, ...loadState() }
    : { ...initialState };
  const store = createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  initSagas(sagaMiddleware);
  return store;
}

function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
