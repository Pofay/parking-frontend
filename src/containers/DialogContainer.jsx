import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import OccupyDialog from '../components/OccupyDialog';
import UnoccupyDialog from '../components/UnoccupyDialog';

const mapStateToProps = state => state.dialogReducer;

const mapDispatchToProps = dispatch => ({
  close: () => dispatch({ type: 'CLOSE-DIALOG' })
});

class DialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogValue: '' };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleOccupy = this.handleOccupy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUnoccupy = this.handleUnoccupy.bind(this);
    this.renderAppropiateDialog = this.renderAppropiateDialog.bind(this);
  }

  handleTextChange(event) {
    event.preventDefault();
    const idNumber = event.target.value;
    this.setState({ dialogValue: idNumber });
  }

  handleOccupy(event) {
    event.preventDefault();
    // dispatch occupy parking lot
  }

  handleUnoccupy(event) {
    event.preventDefault();
    // dispatch unoccupy parking lot
  }

  handleClose(event) {
    event.preventDefault();
    this.props.close();
  }

  renderAppropiateDialog(dialogType, dialogData) {
    if (dialogType === 'OCCUPY-DIALOG')
      return (
        <OccupyDialog
          dialogData={dialogData}
          dialogValue={this.dialogValue}
          onTextChange={this.handleTextChange}
          onClose={this.handleClose}
          onOccupy={this.handleOccupy}
        />
      );
    if (dialogType === 'UNOCCUPY-DIALOG')
      return (
        <UnoccupyDialog
          dialogData={dialogData}
          onClose={this.handleClose}
          onUnoccupy={this.handleUnoccupy}
        />
      );
    return null;
  }

  render() {
    const { isOpen, dialogType, dialogData } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {this.renderAppropiateDialog(dialogType, dialogData)}
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
