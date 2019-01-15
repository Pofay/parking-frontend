import { pipe, chain, prop, head } from 'ramda';

const parkingAppReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD-PARKING-AREAS':
      return normalizeData(action.parkingAreas);
    case 'UPDATE-PARKING-LOT':
      return state.map(x =>
        x.id === action.parkingLot.id
          ? { ...x, status: action.parkingLot.status }
          : x
      );
    case 'ATTACH-OCCUPANTS':
      return state.map(x => ({
        ...x,
        occupant: getOccupant(
          action.occupations.filter(o => o.lotName === x.name)
        )
      }));
    default:
      return state;
  }
};

const getOccupant = pipe(
  head,
  prop('occupant')
);
const normalizeData = chain(x =>
  x.parkingLots.map(i => ({ ...i, areaName: x.areaName, areaId: x.id }))
);

export default parkingAppReducer;
