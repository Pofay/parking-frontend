import React from 'react';
import { tryP } from 'fluture';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import io from 'socket.io-client';
import socketService from '../services/SocketIOService';
import STBuilding from './STBuilding';
import Canteen from './Canteen';
import DialogContainer from './DialogContainer';
import ViolationsTab from './ViolationsTab';
import CommentsTab from './CommentsTab';

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
  resetSearchQuery: () => dispatch({ type: 'INITIAL-STATE' }),
  loadViolations: data =>
    dispatch({ type: 'LOAD-VIOLATIONS', violations: data }),
  addViolation: violation =>
    dispatch({ type: 'ADD-VIOLATION', payload: violation }),
  deleteViolation: violationId =>
    dispatch({ type: 'DELETE-VIOLATION', payload: violationId }),
  updateViolation: violation =>
    dispatch({ type: 'UPDATE-VIOLATION', payload: violation }),
  loadComments: comments => dispatch({ type: 'LOAD-COMMENTS', comments }),
  addComment: comment => dispatch({ type: 'ADD-COMMENT', comment })
});

const fetchFuture = url =>
  tryP(() => fetch(url)).chain(res => tryP(() => res.json()));

class ParkingApp extends React.Component {
  constructor(props) {
    super(props);
    // Move to a Module for Global Access
    const socket = io.connect('http://localhost:4000');

    socketService.init(socket);

    socket.emit('get-comments', {});

    socketService.addListener('status-changed', parkingLot => {
      this.props.updateParkingLot(parkingLot);
    });

    socketService.addListener('parkingLot/unoccupied', occupation => {
      this.props.removeOccupant(occupation);
    });

    socketService.addListener('parkingLot/occupied', occupation => {
      this.props.attachOccupant(occupation);
    });

    socketService.addListener('violations/added', violation => {
      this.props.addViolation(violation);
    });

    socketService.addListener('violations/deleted', violationId => {
      this.props.deleteViolation(violationId);
    });

    socketService.addListener('violations/updated', violation => {
      this.props.updateViolation(violation);
    });

    socketService.addListener('got-comments', result => {
      this.props.loadComments(result.data);
    });

    socketService.addListener('added-comment', result => {
      this.props.addComment(result);
    });

    this.handleChange = this.handleChange.bind(this);
    this.changeTabs = this.changeTabs.bind(this);
    this.state = { tabIndex: 0 };
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
      .chain(() => fetchFuture('http://localhost:4000/violations'))
      .map(res => res.data)
      .map(res => {
        this.props.loadViolations(res);
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

  changeTabs(event, newValue) {
    event.preventDefault();
    this.setState({
      tabIndex: newValue
    });
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={this.changeTabs} centered>
            <Tab label="ST Building" />
            <Tab label="Canteen" />
            <Tab label="Violations" />
            <Tab label="Comments" />
          </Tabs>
        </AppBar>
        <Search handleChange={event => this.handleChange(event)} />
        {tabIndex === 0 && <STBuilding />}
        {tabIndex === 1 && <Canteen />}
        {tabIndex === 2 && <ViolationsTab />}
        {tabIndex === 3 && <CommentsTab />}
        <DialogContainer />
      </div>
    );
  }
}

const Search = ({ handleChange }) => (
  <form autoComplete="off" noValidate>
    <TextField
      id="searchField"
      onChange={handleChange}
      label="Search Name of Occupant"
    />
  </form>
);

export default connect(
  null,
  mapDispatchToProps
)(ParkingApp);
