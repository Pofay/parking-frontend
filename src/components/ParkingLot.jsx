import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {
  toLower,
  contains,
  split,
  map,
  head,
  pipe,
  reduce,
  toUpper
} from 'ramda';
import { connect } from 'react-redux';

const showInitials = pipe(
  split(' '),
  map(head),
  reduce((x, y) => x + y, ''),
  toUpper
);

const mapStateToProps = state => ({
  nameIsContainedInQuery: occupant =>
    occupant === undefined
      ? false
      : pipe(
          toLower,
          contains(toLower(state.searchQuery))
        )(occupant.name)
});

class ParkingLot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      openDialog: false,
      dialogValue: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
  }

  handleOpen() {
    this.setState(state => ({ showTooltip: true }));
  }

  handleClose() {
    this.setState(state => ({ showTooltip: false }));
  }

  handleModalOpen() {
    this.setState(state => ({ openDialog: true }));
  }

  handleModalClose() {
    this.setState(state => ({ dialogValue: '', openDialog: false }));
  }

  handleTextChange(event) {
    const value = event.target.target;
    this.setState(state => ({ dialogValue: value }));
  }

  handleReservation(event) {
    event.preventDefault();
    this.handleModalClose();
  }

  render() {
    const { occupant, name, status } = this.props;
    const { showTooltip, openDialog, dialogValue } = this.state;
    return (
      <div style={{display: 'inline'}}>
        <Tooltip
          title={
            occupant === undefined
              ? 'Not Registered'
              : `${name}: ${occupant.name}`
          }
          placement="top"
          showTooltip={
            showTooltip || this.props.nameIsContainedInQuery(occupant)
          }
        >
          <Chip
            label={occupant === undefined ? '' : showInitials(occupant.name)}
            avatar={ParkingLotAvatar(name, status)}
            onMouseEnter={e => {
              e.preventDefault();
              this.handleOpen();
            }}
            onMouseLeave={e => {
              e.preventDefault();
              this.handleClose();
            }}
            onClick={e => {
              e.preventDefault();
              this.handleModalOpen();
            }}
          />
        </Tooltip>
        <Dialog
          open={openDialog}
          onClose={this.handleModalClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Occupy {this.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the ID Number of Person for Resevation.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="ID Number of Reservee"
              type="email"
              fullWidth
              value={this.dialogValue}
              onSub
              onChange={this.handleTextChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleReservation} color="primary">
              Reserve Lot
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const ParkingLotAvatar = (name, status) => (
  <Avatar
    style={{
      color: '#fff',
      backgroundColor: status === 1 ? '#ff1744' : '#4caf50'
    }}
  >
    {name}
  </Avatar>
);

ParkingLot.defaultProps = {
  name: 'C1',
  status: 0
};

ParkingLot.propTypes = {
  name: PropTypes.string,
  status: PropTypes.number
};

export default connect(mapStateToProps)(ParkingLot);
