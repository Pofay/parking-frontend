import React from 'react';
import { tryP } from 'fluture';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import STBuilding from './STBuilding';

const mapDispatchToProps = dispatch => ({
  updateParkingLot: data =>
    dispatch({ type: 'UPDATE-PARKING-LOT', parkingLot: data.parkingLot }), // Weird, its contained twice?
  loadParkingAreas: data =>
    dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: data }),
  attachOccupants: data =>
    dispatch({ type: 'ATTACH-OCCUPANTS', occupations: data })
});

const fetchFuture = url =>
  tryP(() => fetch(url)).chain(res => tryP(() => res.json()));

class ParkingApp extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect('http://localhost:4000');

    this.socket.on('status-changed', parkingLot => {
      this.props.updateParkingLot(parkingLot);
    });
  }

  componentDidMount() {
    fetchFuture('http://localhost:4000/parking_lots')
      .map(res => res.data)
      .map(res => {
        this.props.loadParkingAreas(res);
        return res;
      })
      .chain(() => fetchFuture('http://localhost:4000/lot_occupations'))
      .map(res => res.data)
      .map(res => {
        this.props.attachOccupants(res);
        return res;
      })
      .fork(console.error, success =>
        console.log('successfully loaded all data')
      );
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
