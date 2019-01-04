import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ParkingLot from '../components/ParkingLot';

const mapStateToProps = state => {
  const upperParkingLots = state.parkingLots
    .filter(x => x.areaId === 2)
    .slice(0, 14);
  return {
    upperParkingLots
  };
};

class STBuilding extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#696969',
          display: 'inline',
          flexGrow: 1
        }}
      >
        <Grid container spacing={16}>
          <Grid item xs={1}>
            <Paper style={{ textAlign: 'center', height: '100%' }}>
              ST Building
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper style={{ textAlign: 'center', height: '100%'}}> Motorcycle Area </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1} style={{ height: '40%'}}>Faculty Area</Paper>
            <div style={{ marginTop: '2%', display: 'inline-block' }}>
              {this.props.upperParkingLots.map(x => (
                <ParkingLot key={x.id} lotName={x.name} status={x.status} />
              ))}
            </div>
          </Grid>
          <Grid item xs={1}>
             <Paper style={{height: '100%'}}elevation={1}>Canteen</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(STBuilding);
