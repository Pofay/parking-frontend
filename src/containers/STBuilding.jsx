import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ParkingLot from '../components/ParkingLot';

export default class STBuilding extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: '#696969', height: '50%', width: '25%' }}>
        <ParkingLot lotName="C1" status={1} />
        <ParkingLot lotName="C2" status={0} />
        <ParkingLot lotName="C3" status={0} />
      </div>
    );
  }
}
