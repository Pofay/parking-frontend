import { createStore, combineReducers, applyMiddleware } from 'redux';
import parkingAppReducer from './ParkingAppReducer';
import searchReducer from './SearchReducer';
import dialogReducer from './DialogReducer';

const reducers = combineReducers({
  parkingLots: parkingAppReducer,
  searchQuery: searchReducer,
  dialogReducer
});

const createAppStore = middleware =>
  createStore(reducers, applyMiddleware(middleware));

export default createAppStore;
