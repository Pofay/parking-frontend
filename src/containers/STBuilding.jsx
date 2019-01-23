import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ParkingLot from '../components/ParkingLot';

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

class STBuilding extends React.Component {
  render() {
    return (
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
            Available Slots: {this.props.occupiedSlots} / {this.props.totalSlots}
          </Paper>
        </Grid>
        <Grid style={{paddingTop: '1%' }}container spacing={16} justify="center">
          <Grid item xs={1}>
            <Paper style={{ textAlign: 'center', height: '100%' }}>
              ST Building
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper style={{ textAlign: 'center', height: '100%' }}>
              {' '}
              Motorcycle Area{' '}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} style={{ height: '40%' }}>
              Faculty Area
            </Paper>
            <div style={{ marginTop: '2%', display: 'inline-block' }}>
              {this.props.upperParkingLots.map(x => (
                <ParkingLot key={x.id} {...x} />
              ))}
            </div>
          </Grid>
          <Grid item xs={1}>
            <Paper style={{ height: '100%' }} elevation={1}>
              Canteen
            </Paper>
          </Grid>
        </Grid>

        <Grid
          style={{ paddingTop: '1%' }}
          container
          spacing={16}
          justify="center"
        >
          <Grid item xs={10}>
            <div style={{ marginTop: '2%', display: 'inline-block' }}>
              {this.props.lowerParkingLots.map(x => (
                <ParkingLot key={x.id} {...x} />
              ))}
            </div>
          </Grid>
          <Grid item xs={10}>
            <Paper
              style={{
                height: '100%',
                paddingRight: '10%',
                paddingLeft: '10%'
              }}
            >
              Main Building
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(STBuilding);
