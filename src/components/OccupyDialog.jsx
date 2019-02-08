import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const OccupyDialog = ({
  dialogData,
  dialogValue,
  onTextChange,
  onClose,
  onOccupy
}) => (
  <form onSubmit={onOccupy}>
    <DialogTitle id="form-dialog-title">{`Occupy ${dialogData.lotName}`}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Please enter the ID Number of Person for Resevation.
      </DialogContentText>
      <TextField
        required
        autoFocus
        margin="dense"
        id="name"
        label="ID Number of Reservee"
        type="text"
        fullWidth
        value={dialogValue}
        onChange={onTextChange}
      />
    </DialogContent>
    <DialogActions>
      <Button type="submit" color="primary">
        Reserve Lot
      </Button>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
    </DialogActions>
  </form>
);

export default OccupyDialog;