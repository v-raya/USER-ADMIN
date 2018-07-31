const CLIENT_STORE_KEY = 'cap';

const getStore = _ => window.sessionStorage;

export const loadState = _ => {
  try {
    const serializedState = getStore().getItem(CLIENT_STORE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    getStore().setItem(CLIENT_STORE_KEY, serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const deleteState = _ => {
  try {
    getStore().sessionStorage.removeItem(CLIENT_STORE_KEY);
  } catch (err) {
    console.log(err);
  }
};
