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

const mapStateToProps = state => {
  const {
    violationId,
    occupantId,
    violatedRule,
    additionalNotes,
    violationStatus
  } = state.dialogReducer.dialogData;

  return {
    violationId,
    occupantId,
    violatedRule,
    additionalNotes,
    violationStatus
  };
};
const mapDispatchToProps = dispatch => ({
  updateViolation: payload => {
    dispatch({ type: 'UPDATE-VIOLATION-REQUEST', payload })
  }
});

class UpdateViolationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      violationId: '',
      occupantId: '',
      violatedRule: '',
      additionalNotes: '',
      violationStatus: ''
    };

    this.loadInitialState = this.loadInitialState.bind(this);
    this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
    this.handleRuleViolatedChange = this.handleRuleViolatedChange.bind(this);
    this.handleAdditionalNotesChange = this.handleAdditionalNotesChange.bind(
      this
    );
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadInitialState();
  }

  loadInitialState() {
    const {
      violationId,
      occupantId,
      violatedRule,
      additionalNotes,
      violationStatus
    } = this.props;

    this.setState({
      violationId,
      occupantId,
      violatedRule,
      additionalNotes,
      violationStatus
    });
  }

  handleIdNumberChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ occupantId: value });
  }

  handleStatusChange(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ violationStatus: value });
  }

  handleRuleViolatedChange(event) {
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
    const {
      violationId,
      occupantId,
      violatedRule,
      additionalNotes,
      violationStatus
    } = this.state;
    this.props.updateViolation({
      violationId,
      occupantId,
      violatedRule,
      additionalNotes,
      violationStatus
    });
  }

  handleClose(event) {
    event.preventDefault();
    this.props.onClose(event);
    this.loadInitialState();
  }

  render() {
    const {
      occupantId,
      violatedRule,
      additionalNotes
    } = this.state;
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <DialogTitle id="form-dialog-title">
          Update A Parking Violation
        </DialogTitle>
        <DialogContent className={classes.div}>
          <DialogContentText>Update Violation Details:</DialogContentText>

          <TextField
            value={occupantId}
            onChange={this.handleIdNumberChange}
            margin="dense"
            fullWidth
            className={classes.fields}
            label="Id Number of Violator"
          />
          <TextField
            value={violatedRule}
            onChange={this.handleRuleViolatedChange}
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
            Update
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
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateViolationDialog));
