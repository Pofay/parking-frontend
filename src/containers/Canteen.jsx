import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ParkingLot from '../components/ParkingLot';

const styles = theme => ({
  root: {
    backgroundColor: '#696969',
    display: 'inline',
    flexGrow: 1,
    margin: 'auto'
  },
  parkingLots: {
    display: 'inline-block',
    marginTop: '2%'
  },

  container: {
    paddingTop: '1%'
  },

  building: {
    height: '100%',
    paddingRight: '10%',
    paddingLeft: '10%'
  }
});

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

const Canteen = ({
  classes,
  occupiedSlots,
  totalSlots,
  upperParkingLots,
  upperMiddleParkingLots,
  lowerMiddleParkingLots,
  lowerParkingLots
}) => (
  <div className={classes.root}>
    <Grid container spacing={16} justify="left">
      <Grid item xs={2} />
      <Paper>
        {' '}
        Available Slots: {occupiedSlots} / {totalSlots}
      </Paper>
    </Grid>
    <Grid className={classes.container} container spacing={16} justify="center">
      <Grid item xs={8}>
        <div className={classes.parkingLots}>
          {upperParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={8}>
        <div className={classes.parkingLots}>
          {upperMiddleParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={8}>
        <div className={classes.parkingLots}>
          {lowerMiddleParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={8}>
        <div className={classes.parkingLots}>
          {lowerParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
    </Grid>
    <Grid className={classes.container} container spacing={16} justify="center">
      <Grid item xs={10}>
        <Paper className={classes.building}>Covered Walk</Paper>
      </Grid>
    </Grid>
  </div>
);

export default connect(mapStateToProps)(withStyles(styles)(Canteen));
