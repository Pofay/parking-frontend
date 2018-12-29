import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

const ParkingLot = ({ lotName, status }) => (
  <Chip
    label={status === 1 ? 'occupied' : 'vacant'}
    avatar={<Avatar>{lotName}</Avatar>}
    style={{ backgroundColor: status === 1 ? '#ff1744' : '#4caf50' }}
  />
);

ParkingLot.defaultProps= {
    lotName: 'C1',
    status: 0
}

ParkingLot.propTypes = {
  lotName: PropTypes.string,
  status: PropTypes.number
};

export default ParkingLot;
