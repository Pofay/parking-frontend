const INITIAL_STATE = { isOpen: false, dialogType: 'none', dialogData: {} };

const dialogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'OCCUPY-DIALOG':
      return {
        isOpen: true,
        dialogType: 'OCCUPY-DIALOG',
        dialogData: action.dialogData
      };
    case 'UNOCCUPY-DIALOG':
      return {
        isOpen: true,
        dialogType: 'UNOCCUPY-DIALOG',
        dialogData: action.dialogData
      };
    case 'ADD-VIOLATION-DIALOG':
      return {
        isOpen: true,
        dialogType: 'ADD-VIOLATION-DIALOG'
      }
    case 'DELETE-VIOLATION-DIALOG':
      return {
        isOpen: true,
        dialogType: 'DELETE-VIOLATION-DIALOG',
        dialogData: action.dialogData
      }
    case 'UPDATE-VIOLATION-DIALOG':
       return {
         isOpen: true,
         dialogType: 'UPDATE-VIOLATION-DIALOG',
         dialogData: action.dialogData
       }
    case 'CLOSE-DIALOG':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default dialogReducer;
