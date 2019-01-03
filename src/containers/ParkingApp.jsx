import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import STBuilding from './STBuilding';

const mapDispatchToProps = dispatch => ({
  updateParkingLot: data =>
    dispatch({ type: 'UPDATE-PARKING-LOT', parkingLot: data }),
  populateStore: data => dispatch({type: 'LOAD-PARKING-AREAS', parkingAreas: data})
});

class ParkingApp extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('http://localhost:4000');

    this.socket.on('status-changed', parkingLot => {
      this.props.updateParkingLot(parkingLot);
    });
  }

  componentDidMount() {
      fetch('http://localhost:4000/parking_lots')
      .then(res => res.json())
      .then(res => this.props.populateStore(res.data))
  }  

  componentWillUnmount() {
    this.socket.disconnect();
    console.log('Disconnected from Socket.IO Server');
  }

  render() {
    return <STBuilding />;
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ParkingApp);
