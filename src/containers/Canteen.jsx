import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ParkingLot from '../components/ParkingLot';

const mapStateToProps = state => {
  const upperParkingLots = state.parkingLots
    .filter(x => x.areaId === 3)
    .slice(0, 18);
  const upperMiddleParkingLots = state.parkingLots
    .filter(x => x.areaId === 3)
    .slice(18, 35);

  const lowerMiddleParkingLots = state.parkingLots
    .filter(x => x.areaId === 3)
    .slice(35, 50);

  const lowerParkingLots = state.parkingLots
    .filter(x => x.areaId === 3)
    .slice(50);

  const occupiedSlots = state.parkingLots
    .filter(x => x.areaId === 3)
    .filter(x => x.status === 1).length;
  const totalSlots = state.parkingLots.filter(x => x.areaId === 3).length;

  return {
    upperParkingLots,
    upperMiddleParkingLots,
    lowerMiddleParkingLots,
    lowerParkingLots,
    occupiedSlots,
    totalSlots
  };
};

const Canteen = props => (
  <div
    style={{
      backgroundColor: '#696969',
      display: 'inline',
      flexGrow: 1,
      margin: 'auto'
    }}
  >
    <Grid container spacing={16} justify="left">
      <Grid item xs={2} />
      <Paper>
        {' '}
        Available Slots: {props.occupiedSlots} / {props.totalSlots}
      </Paper>
    </Grid>
    <Grid style={{ paddingTop: '1%' }} container spacing={16} justify="center">
      <Grid item xs={8}>
        <div style={{ marginTop: '2%', display: 'inline-block' }}>
          {props.upperParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={8}>
        <div style={{ marginTop: '2%', display: 'inline-block' }}>
          {props.upperMiddleParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={8}>
        <div style={{ marginTop: '2%', display: 'inline-block' }}>
          {props.lowerMiddleParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={8}>
        <div style={{ marginTop: '2%', display: 'inline-block' }}>
          {props.lowerParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
    </Grid>
    <Grid container spacing={16} justify="center" style={{ marginTop: '1%' }}>
      <Grid item xs={10}>
        <Paper
          style={{
            height: '100%',
            paddingRight: '10%',
            paddingLeft: '10%'
          }}
        >
          Covered Walk
        </Paper>
      </Grid>
    </Grid>
  </div>
);

export default connect(mapStateToProps)(Canteen);
