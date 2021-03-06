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
  },
  areas: {
    textAlign: 'center',
    height: '100%'
  }
});

const mapStateToProps = state => {
  const upperParkingLots = state.parkingLots
    .filter(x => x.areaId === 2)
    .slice(0, 14);

  const lowerParkingLots = state.parkingLots
    .filter(x => x.areaId === 2)
    .slice(14);

  const occupiedSlots = upperParkingLots
    .concat(lowerParkingLots)
    .filter(x => x.status === 1).length;
  const totalSlots = upperParkingLots.concat(lowerParkingLots).length;

  return {
    upperParkingLots,
    lowerParkingLots,
    occupiedSlots,
    totalSlots
  };
};

const STBuilding = ({
  classes,
  occupiedSlots,
  totalSlots,
  upperParkingLots,
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
      <Grid item xs={1}>
        <Paper className={classes.areas}>ST Building</Paper>
      </Grid>
      <Grid item xs={1}>
        <Paper className={classes.areas}> Motorcycle Area </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={1} style={{ height: '40%' }}>
          Faculty Area
        </Paper>
        <div className={classes.parkingLots}>
          {upperParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={1}>
        <Paper className={classes.areas} elevation={1}>
          Canteen
        </Paper>
      </Grid>
    </Grid>

    <Grid className={classes.container} container spacing={16} justify="center">
      <Grid item xs={10}>
        <div className={classes.parkingLots}>
          {lowerParkingLots.map(x => (
            <ParkingLot key={x.id} {...x} />
          ))}
        </div>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.building}>Main Building</Paper>
      </Grid>
    </Grid>
  </div>
);

export default connect(mapStateToProps)(withStyles(styles)(STBuilding));
