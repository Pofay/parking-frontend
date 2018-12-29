import { createStore, combineReducers } from 'redux';
import parkingAppReducer from './ParkingAppReducer';

const reducers = combineReducers({
  parkingAreas: parkingAppReducer
});


const createAppStore = () => createStore(reducers)

export default createAppStore
