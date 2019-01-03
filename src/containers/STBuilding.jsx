import React from 'react';
import { connect } from 'react-redux'
import ParkingLot from '../components/ParkingLot';

const mapStateToProps = state => ({ parkingLots: state.parkingLots.filter(x => x.areaId === 2)})

class STBuilding extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: '#696969', height: '50%', width: '25%' }}>
        {this.props.parkingLots.map(x => (<ParkingLot key={x.id} lotName={x.name} status={x.status}/>))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(STBuilding)


