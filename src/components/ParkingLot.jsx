import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
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
    this.state = { open: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState(state => ({ open: true }));
  }

  handleClose() {
    this.setState(state => ({ open: false }));
  }

  render() {
    const { occupant, name, status } = this.props;
    const { open } = this.state;
    return (
      <Tooltip
        title={
          occupant === undefined
            ? 'Not Registered'
            : `${name}: ${occupant.name}`
        }
        placement="top"
        open={open || this.props.nameIsContainedInQuery(occupant)}
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
        />
      </Tooltip>
    );
  }
}

const ParkingLotAvatar = (name, status) => (
  <Avatar style={{ color: '#fff', backgroundColor: status === 1 ? '#ff1744' : '#4caf50' }}>
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
