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
    case 'ATTACH-OCCUPANT':
      return state.map(x =>
        x.name === action.occupation.lotName
          ? { ...x, occupant: prop('occupant', action.occupation) }
          : x
      );
    case 'REMOVE-OCCUPANT':
      return state.map(x =>
        x.name === action.value.lotName
          ? { ...x, occupant: undefined }
          : x
      );
    default:
      return state;
  }
}

const getOccupant = pipe(
  head,
  prop('occupant')
);
const normalizeData = chain(x =>
  x.parkingLots.map(i => ({ ...i, areaName: x.areaName, areaId: x.id }))
);

export default parkingAppReducer;
