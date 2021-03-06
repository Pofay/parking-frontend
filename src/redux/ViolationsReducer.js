const INITIAL_STATE = [];

const violationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOAD-VIOLATIONS':
      return action.violations;
    case 'ADD-VIOLATION':
      return state.concat(action.payload);
    case 'DELETE-VIOLATION':
      return state.filter(v => v.id !== action.payload);
    case 'UPDATE-VIOLATION':
      return state.map(v =>
        v.id === action.payload.id ? action.payload : v
      );
    default:
      return state;
  }
};

export default violationsReducer;
