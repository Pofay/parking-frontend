import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

const ParkingLot = ({ name, status }) => (
  <Chip
    avatar={ParkingLotAvatar(name,status)}
  />
);

const ParkingLotAvatar= (name, status) => (<Avatar style={{ backgroundColor: status === 1 ? '#ff1744' : '#4caf50' }}>{name}</Avatar>)

ParkingLot.defaultProps= {
    name: 'C1',
    status: 0
}

ParkingLot.propTypes = {
  name: PropTypes.string,
  status: PropTypes.number
};

export default ParkingLot;
