import { createStore, combineReducers } from 'redux';
import parkingAppReducer from './ParkingAppReducer';
import searchReducer from './SearchReducer'

const reducers = combineReducers({
  parkingLots: parkingAppReducer,
  searchQuery: searchReducer
});

const createAppStore = () => createStore(reducers)

export default createAppStore
