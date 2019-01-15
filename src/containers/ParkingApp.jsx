import React from 'react';
import { tryP } from 'fluture';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import STBuilding from './STBuilding';

const mapDispatchToProps = dispatch => ({
  updateParkingLot: data =>
    dispatch({ type: 'UPDATE-PARKING-LOT', parkingLot: data.parkingLot }), // Weird, its contained twice?
  loadParkingAreas: data =>
    dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: data })
});

const fetchFuture = url => tryP(() => fetch(url));

class ParkingApp extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('http://localhost:4000');

    this.socket.on('status-changed', parkingLot => {
      this.props.updateParkingLot(parkingLot);
    });
  }

  componentDidMount() {
    /*
      fetch('http://localhost:4000/parking_lots')
      .then(res => res.json())
      .then(res => this.props.loadParkingAreas(res.data))
      */
    fetchFuture('http://localhost:4000/parking_lots')
      .chain(res => tryP(() => res.json()))
      .map(res => res.data)
      .fork(console.error, res => this.props.loadParkingAreas(res));
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
