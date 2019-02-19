const INITIAL_STATE = [{ name: 'Gilos', comment: 'UI Tweaking' }];
const commentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD-COMMENT':
      return state.concat(action.comment);
    case 'LOAD-COMMENTS':
      return action.comments
    default:
      return state;
  }
};

export default commentsReducer;
