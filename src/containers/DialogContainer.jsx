import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import OccupyDialog from '../components/OccupyDialog';
import UnoccupyDialog from '../components/UnoccupyDialog';

const mapStateToProps = state => {
  const { isOpen, dialogType } = state.dialogReducer;
  return { isOpen, dialogType };
};

const mapDispatchToProps = dispatch => ({
  close: event => {
    event.preventDefault();
    dispatch({ type: 'CLOSE-DIALOG' });
  }
});

const DialogContainer = ({ isOpen, dialogType, close }) => (
  <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
    {renderAppropiateDialog(dialogType, close)}
  </Dialog>
);

const renderAppropiateDialog = (dialogType, onClose) => {
  switch (dialogType) {
    case 'OCCUPY-DIALOG':
      return <OccupyDialog onClose={onClose} />;
    case 'UNOCCUPY-DIALOG':
      return <UnoccupyDialog onClose={onClose} />;
    default:
      return null;
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);