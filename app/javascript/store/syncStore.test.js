import { SyncStore, observeStore } from './syncStore';

describe('SyncStore', () => {
  let syncStore;
  let mockStore;

  beforeEach(() => {
    const MockStore = jest.fn().mockImplementation(() => {
      return {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      };
    });
    const key = 'MY_KEY';
    mockStore = new MockStore();
    syncStore = new SyncStore(mockStore, key);
  });

  it('loads state', () => {
    mockStore.getItem.mockImplementation(_ => JSON.stringify({ a: 1 }));
    expect(mockStore.getItem).not.toHaveBeenCalled();
    const state = syncStore.loadState();
    expect(state).toEqual({ a: 1 });
    expect(mockStore.getItem).toHaveBeenCalledWith('MY_KEY');
  });

  it('handles getItem errors', () => {
    console.log = jest.fn();
    mockStore.getItem.mockImplementation(_ => 'not json');
    let out;
    expect(() => (out = syncStore.loadState())).not.toThrow();
    expect(out).toBeUndefined();
  });

  it('saves state', () => {
    mockStore.setItem.mockImplementation(_ => {});
    expect(mockStore.setItem).not.toHaveBeenCalled();
    syncStore.saveState({ a: 1 });
    expect(mockStore.setItem).toHaveBeenCalledWith(
      'MY_KEY',
      jasmine.any(String)
    );
    expect(mockStore.setItem).toHaveBeenCalledTimes(1);
  });

  it('handles setItem errors', () => {
    console.log = jest.fn();
    const err = Error('Oh nos!');
    const throwError = () => {
      throw err;
    };
    mockStore.setItem.mockImplementation(throwError);
    expect(_ => syncStore.saveState({})).not.toThrow();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith(err);
  });

  it('deletes state', () => {
    mockStore.removeItem.mockImplementation(_ => {});
    expect(mockStore.removeItem).not.toHaveBeenCalled();
    syncStore.deleteState();
    expect(mockStore.removeItem).toHaveBeenCalledWith('MY_KEY');
    expect(mockStore.removeItem).toHaveBeenCalledTimes(1);
  });

  it('handles removeItem errors', () => {
    const err = Error('Oh nos!');
    const throwError = () => {
      throw err;
    };
    mockStore.removeItem.mockImplementation(throwError);
    expect(_ => syncStore.deleteState()).not.toThrow();
    expect(console.log).toHaveBeenCalledWith(err);
  });
});

describe('#observeStore', () => {
  let mockStore;

  beforeEach(() => {
    const MockStore = jest.fn().mockImplementation(() => {
      return {
        getState: jest.fn(),
        subscribe: jest.fn(),
      };
    });
    mockStore = new MockStore();
  });

  it('#handleChange', () => {
    const select = jest.fn();
    let onChange = jest.fn();
    mockStore.getState.mockImplementation(_ => JSON.stringify({}));
    expect(mockStore.getState).not.toHaveBeenCalledWith([]);
    observeStore(mockStore, select, onChange);
    mockStore.subscribe.mockImplementation(_ => {});
    expect(mockStore.subscribe).not.toThrow();
  });
});
