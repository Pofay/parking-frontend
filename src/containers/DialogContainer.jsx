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
    this.handleClose = this.handleClose.bind(this);
    this.renderAppropiateDialog = this.renderAppropiateDialog.bind(this);
  }

  handleClose(event) {
    event.preventDefault();
    this.props.close();
  }

  renderAppropiateDialog(dialogType) {
    switch (dialogType) {
      case 'OCCUPY-DIALOG':
        return <OccupyDialog onClose={this.handleClose} />;
      case 'UNOCCUPY-DIALOG':
        return <UnoccupyDialog onClose={this.handleClose} />;
      default:
        return null;
    }
  }

  render() {
    const { isOpen, dialogType } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        {this.renderAppropiateDialog(dialogType)}
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContainer);
