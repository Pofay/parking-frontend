import { chain } from 'ramda'

const parkingAppReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD-PARKING-AREAS':
      return normalizeData(action.parkingAreas)
    case 'UPDATE-PARKING-LOT':
      console.log(action)
      return state.map(x => x.id === action.parkingLot.id ? {...x, status: action.parkingLot.status } : x)
    default:
      return state;
  }
};

const normalizeData = chain((x) => x.parkingLots.map(i => ({...i, areaName: x.areaName, areaId: x.id})))


export default parkingAppReducer;
