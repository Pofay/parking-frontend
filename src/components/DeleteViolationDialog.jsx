import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { violationId } = state.dialogReducer.dialogData;

  return {
    violationId
  };
};
const mapDispatchToProps = dispatch => ({
  onDelete: violationId => event => {
    event.preventDefault();
    dispatch({ type: 'DELETE-VIOLATION-REQUEST', payload: { violationId } });
  }
});

const DeleteViolationDialog = ({ violationId, onDelete, onClose }) => (
  <form onSubmit={onDelete(violationId)}>
    <DialogTitle id="form-dialog-title">Remove a Violation</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this violation?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button type="submit" color="primary">
        Delete
      </Button>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
    </DialogActions>
  </form>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteViolationDialog);
