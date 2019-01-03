import { createStore, combineReducers } from 'redux';
import parkingAppReducer from './ParkingAppReducer';

const reducers = combineReducers({
  parkingLots: parkingAppReducer
});

const createAppStore = () => createStore(reducers)

export default createAppStore
