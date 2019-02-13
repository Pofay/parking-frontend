import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { lotName } = state.dialogReducer.dialogData;
  return { lotName };
};
const mapDispatchToProps = dispatch => ({
  onOccupy: (lotName, idNumber) =>
    dispatch({ type: 'OCCUPY-REQUEST', payload: { lotName, idNumber } })
});

class OccupyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { idNumberEntered: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { lotName, onOccupy } = this.props;
    const { idNumberEntered } = this.state;
    onOccupy(lotName, idNumberEntered);
  }

  handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ idNumberEntered: value });
  }

  handleClose(event) {
    this.props.onClose(event);
    this.setState({ idNumberEntered: '' });
  }

  render() {
    const { lotName } = this.props;
    const { idNumberEntered } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <DialogTitle id="form-dialog-title">{`Occupy ${lotName}`}</DialogTitle>
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
            value={idNumberEntered}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Reserve Lot
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OccupyDialog);
