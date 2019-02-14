import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },

  div: {
    marginRight: '10%',
    marginLeft: '10%'
  },

  openAddViolationDialog: {
    marginLeft: '60%'
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const mapStateToProps = state => ({ violations: state.violationsReducer });

const mapDispatchToProps = dispatch => ({
  openAddViolationDialog: event => {
    event.preventDefault();
    dispatch({ type: 'ADD-VIOLATION-DIALOG' });
  },
  openDeleteViolationDialog: violationId => event => {
    event.preventDefault();
    dispatch({ type: 'DELETE-VIOLATION-DIALOG', dialogData: { violationId } });
  },
  openUpdateViolationDialog: (
    violationId,
    occupantId,
    violatedRule,
    additionalNotes,
    violationStatus
  ) => event => {
    event.preventDefault();
    dispatch({
      type: 'UPDATE-VIOLATION-DIALOG',
      dialogData: {
        violationId,
        occupantId,
        violatedRule,
        additionalNotes,
        violationStatus
      }
    });
  }
});

const ViolationsTab = ({
  violations,
  openAddViolationDialog,
  openDeleteViolationDialog,
  openUpdateViolationDialog,
  classes
}) => (
  <div className={classes.div}>
    <Button
      color="primary"
      className={classes.openAddViolationDialog}
      onClick={openAddViolationDialog}
    >
      {' '}
      Add Violation{' '}
    </Button>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Violation Number</TableCell>
            <TableCell align="right">Id Number</TableCell>
            <TableCell align="right">Rule Violated</TableCell>
            <TableCell align="right">Additional Notes</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell aligh="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {violations.map(
            ({ id, occupant_id, rule_violated, additional_notes, status }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{occupant_id}</TableCell>
                <TableCell>{rule_violated}</TableCell>
                <TableCell>{additional_notes}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={openDeleteViolationDialog(id)}
                  >
                    Delete
                    <DeleteIcon className={classes.rightIcon} />
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={openUpdateViolationDialog(
                      id,
                      occupant_id,
                      rule_violated,
                      additional_notes,
                      status
                    )}
                  >
                    Update
                    <AddIcon className={classes.rightIcon} />
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViolationsTab));
