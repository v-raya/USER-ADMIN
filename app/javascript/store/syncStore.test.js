import { SyncStore } from './syncStore';

describe.only('SyncStore', () => {
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
    mockStore = new MockStore();
    syncStore = new SyncStore(mockStore, 'MY_KEY');
  });

  it('loads state', () => {
    mockStore.getItem.mockImplementation(_ => JSON.stringify({ a: 1 }));
    expect(mockStore.getItem).not.toHaveBeenCalled();
    const state = syncStore.loadState();
    expect(state).toEqual({ a: 1 });
    expect(mockStore.getItem).toHaveBeenCalledWith('MY_KEY');
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

  it('deletes state', () => {
    mockStore.removeItem.mockImplementation(_ => {});
    expect(mockStore.removeItem).not.toHaveBeenCalled();
    syncStore.deleteState();
    expect(mockStore.removeItem).toHaveBeenCalledWith('MY_KEY');
    expect(mockStore.removeItem).toHaveBeenCalledTimes(1);
  });
});
