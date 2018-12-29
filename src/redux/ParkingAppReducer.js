const parkingAppReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD-PARKING-AREAS':
      return action.parkingAreas;
    default:
      return state;
  }
};

export default parkingAppReducer;
