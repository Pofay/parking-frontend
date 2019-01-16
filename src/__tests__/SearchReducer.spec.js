import { createStore, combineReducers } from 'redux';
import searchQueryReducer from '../redux/SearchReducer'

it('should start out with a empty on initialState', () => {
  const expected = {
    searchQuery: 'empty' 
  };

  const store = createStore(
    combineReducers({
      searchQuery: searchQueryReducer
    })
  );

  const actual = store.getState();

  expect(actual).toEqual(expected);
});

it('should populate searchQuery on dispatch SEARCH', () => {
  const expected = {
    searchQuery: 'Pofay'
  };

  const store = createStore(
    combineReducers({
      searchQuery: searchQueryReducer
    })
  );

  store.dispatch({ type: 'SEARCH', value: 'Pofay' });

  const actual = store.getState();

  expect(actual).toEqual(expected);
});

it('should provide a fallback to go back to initialState', () => {
  const expected = {
    searchQuery: 'empty'
  };

  const store = createStore(
    combineReducers({
      searchQuery: searchQueryReducer
    })
  );

  store.dispatch({ type: 'SEARCH', value: 'Pofay' });
  store.dispatch({ type: 'INITIAL-STATE'})

  const actual = store.getState();

  expect(actual).toEqual(expected);
})
