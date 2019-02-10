const INITIAL_STATE = 'empty';

const searchQueryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.value;
    case 'INITIAL-STATE':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchQueryReducer;
