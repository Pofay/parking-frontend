import { createStore, combineReducers } from 'redux';
import parkingAppReducer from './ParkingAppReducer';
import searchReducer from './SearchReducer';
import dialogReducer from './DialogReducer';

const reducers = combineReducers({
  parkingLots: parkingAppReducer,
  searchQuery: searchReducer,
  dialogReducer
});

const createAppStore = () => createStore(reducers);

export default createAppStore;
