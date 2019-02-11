import { createStore, combineReducers, applyMiddleware } from 'redux';
import parkingAppReducer from './ParkingAppReducer';
import searchReducer from './SearchReducer';
import dialogReducer from './DialogReducer';
import violationsReducer from './ViolationsReducer';

const reducers = combineReducers({
  parkingLots: parkingAppReducer,
  searchQuery: searchReducer,
  dialogReducer,
  violationsReducer
});

const createAppStore = middleware =>
  createStore(reducers, applyMiddleware(middleware));

export default createAppStore;
