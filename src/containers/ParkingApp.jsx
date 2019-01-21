import React from 'react';
import { tryP } from 'fluture';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import io from 'socket.io-client';
import STBuilding from './STBuilding';

const mapDispatchToProps = dispatch => ({
  updateParkingLot: data =>
    dispatch({ type: 'UPDATE-PARKING-LOT', parkingLot: data.parkingLot }), // Weird, its contained twice?
  loadParkingAreas: data =>
    dispatch({ type: 'LOAD-PARKING-AREAS', parkingAreas: data }),
  attachOccupants: data =>
    dispatch({ type: 'ATTACH-OCCUPANTS', occupations: data }),
  setSearchQuery: data => dispatch({ type: 'SEARCH', value: data }),
  attachOccupant: data =>
    dispatch({ type: 'ATTACH-OCCUPANT', occupation: data }),
  removeOccupant: data => dispatch({ type: 'REMOVE-OCCUPANT', value: data }),
  resetSearchQuery: () => dispatch({ type: 'INITIAL-STATE' })
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

    this.socket.on('parkingLot/unoccupied', occupation => {
      this.props.removeOccupant(occupation);
    });

    this.socket.on('parkingLot/occupied', occupation => {
      this.props.attachOccupant(occupation);
    });

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    event.preventDefault();
    if (event.target.value !== '')
      this.props.setSearchQuery(event.target.value.trim());
    else this.props.resetSearchQuery();
  }

  render() {
    return (
      <div>
        <form autoComplete="off" noValidate>
          <TextField
            id="searchField"
            onChange={this.handleChange}
            label="Search Name of Occupant"
          />
        </form>
        <STBuilding />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ParkingApp);
