export const CLIENT_STORE_KEY = 'cap';

export class SyncStore {
  constructor(store = window.sessionStorage, key = CLIENT_STORE_KEY) {
    this._store = store;
    this._key = key;
  }

  get store() {
    return this._store;
  }

  get key() {
    return this._key;
  }

  loadState() {
    try {
      const serializedState = this.store.getItem(this.key);
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }

  saveState(state) {
    try {
      const serializedState = JSON.stringify(state);
      this.store.setItem(this.key, serializedState);
    } catch (err) {
      console.log(err);
    }
  }
}

export function observeStore(store, select, onChange) {
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

export function deleteState() {
  try {
    window.sessionStorage.removeItem(CLIENT_STORE_KEY);
  } catch (err) {
    console.log(err);
  }
}
export default SyncStore;
