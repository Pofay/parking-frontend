import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { split, map, head, pipe, reduce, toUpper } from 'ramda';

const showInitials = 
  pipe(
    split(' '),
    map(head),
    reduce((x, y) => x + y, ''),
    toUpper
  );

const ParkingLot = ({ name, status, occupant }) => (
  <Tooltip
    title={
      occupant === undefined ? 'Not Registered' : `${name}: ${occupant.name}`
    }
    placement="top"
  >
    <Chip
      label={occupant === undefined ? '' : showInitials(occupant.name)}
      avatar={ParkingLotAvatar(name, status)}
    />
  </Tooltip>
);

// Show first Letters of each word in name
const ParkingLotAvatar = (name, status) => (
  <Avatar style={{ backgroundColor: status === 1 ? '#ff1744' : '#4caf50' }}>
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

export default ParkingLot;
