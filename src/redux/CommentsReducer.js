const INITIAL_STATE = [{ name: 'Gilos', comment: 'UI Tweaking' }];
const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD-COMMENT':
      return state.concat(action.comment);
    case 'LOAD-COMMENTS':
      return action.comments;
    default:
      return INITIAL_STATE;
  }
};

export default commentsReducer;
