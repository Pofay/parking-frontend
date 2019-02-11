const INITIAL_STATE = []

const violationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOAD-VIOLATIONS':
      return action.violations
    case 'ADD-VIOLATION':
      return state.concat(action.payload)
    default:
      return state;
  }
};

export default violationsReducer;
