import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    margin: 0
  },
  fields: {
    display: 'block'
  },

  div: {
    width: '100%'
  }
});

const mapDispatchToProps = dispatch => ({
  addViolation: payload => dispatch({ type: 'ADD-VIOLATION-REQUEST', payload })
});

class AddViolationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { idNumber: '', violatedRule: '', additionalNotes: '' };
    this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
    this.handleViolatedRuleChange = this.handleViolatedRuleChange.bind(this);
    this.handleAdditionalNotesChange = this.handleAdditionalNotesChange.bind(
      this
    );
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdNumberChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ idNumber: value });
  }

  handleViolatedRuleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ violatedRule: value });
  }

  handleAdditionalNotesChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ additionalNotes: value });
  }

  handleSubmit(event) {
    this.handleClose(event);
    const { idNumber, violatedRule, additionalNotes } = this.state
    this.props.addViolation({
      idNumber,
      violatedRule,
      additionalNotes
    })
  }

  handleClose(event) {
    event.preventDefault();
    this.props.onClose(event);
    this.setState({ idNumber: '', violatedRule: '', additionalNotes: '' });
  }

  render() {
    const { classes } = this.props;
    const { idNumber, violatedRule, additionalNotes } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <DialogTitle id="form-dialog-title">
          Add A Parking Violation
        </DialogTitle>
        <DialogContent className={classes.div}>
          <DialogContentText>Enter Violation Details:</DialogContentText>

          <TextField
            value={idNumber}
            onChange={this.handleIdNumberChange}
            margin="dense"
            fullWidth
            className={classes.fields}
            label="Id Number of Violator"
          />
          <TextField
            value={violatedRule}
            onChange={this.handleViolatedRuleChange}
            margin="dense"
            fullWidth
            className={classes.fields}
            label="Enter Violated Rule"
          />
          <TextField
            value={additionalNotes}
            onChange={this.handleAdditionalNotesChange}
            margin="dense"
            fullWidth
            className={classes.fields}
            label="Additional Notes"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Submit
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(AddViolationDialog));
