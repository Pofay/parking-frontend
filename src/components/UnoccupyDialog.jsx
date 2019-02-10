import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onUnoccupy: (lotName, idNumber) =>
    dispatch({ type: 'UNOCCUPY-REQUEST', payload: { lotName, idNumber } })
});

const UnoccupyDialog = ({ dialogData, onUnoccupy, onClose }) => {
  const idNumber = dialogData.occupant.school_id_number;

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        onUnoccupy(dialogData.lotName, idNumber)
      }}
    >
      <DialogTitle id="form-dialog-title">{`Remove Current Occupant at ${
        dialogData.lotName
      } `}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This Lot has already been occupied by <b>{idNumber}.</b>
          Would you like to remove the current occupant?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary">
          Remove Occupant
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </form>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(UnoccupyDialog);
