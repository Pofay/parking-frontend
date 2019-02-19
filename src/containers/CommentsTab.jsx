import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    margin: 0
  },
  fields: {
    marginRight: '5%'
  },

  div: {
    width: '100%'
  },
  table: {
    minWidth: 700,
    marginRight: '20%',
    marginLeft: '20%'
  }
});

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  submitComment: comment => dispatch({ type: 'SUBMIT-COMMENT', data: comment })
});

class CommentsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', comment: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCommentsChange = this.handleCommentsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    event.preventDefault();
    const { value } = event.target;
    console.log(value);
    this.setState({ name: value });
  }

  handleCommentsChange(event) {
    event.preventDefault();
    const { value } = event.target;
    console.log(value);
    this.setState({ comment: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, comment } = this.state;
    this.props.submitComment({ name, comment });
    this.setState({
      name: '',
      comment: ''
    });
  }

  render() {
    const { comments, classes } = this.props;
    const { name, comment } = this.state;
    return (
      <div className={classes.root}>
        <CommentsForm
          classes={classes}
          onNameChange={this.handleNameChange}
          onCommentsChange={this.handleCommentsChange}
          onSubmit={this.handleSubmit}
          nameValue={name}
          commentValue={comment}
        />
        <div className={classes.table}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  {' '}
                  <TableCell>Name</TableCell>{' '}
                  <TableCell>Comments/Suggestions</TableCell>{' '}
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.map(d => (
                  <TableRow>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

const CommentsForm = ({
  classes,
  onSubmit,
  onNameChange,
  onCommentsChange,
  nameValue,
  commentValue
}) => (
  <div>
    <h2>Comments and Suggestions</h2>
    <form onSubmit={event => onSubmit(event)}>
      <TextField
        className={classes.fields}
        label="Name"
        value={nameValue}
        onChange={event => onNameChange(event)}
      />

      <TextField
        className={classes.fields}
        label="Comments/Suggestions"
        value={commentValue}
        onChange={event => onCommentsChange(event)}
      />

      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </form>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentsTab));
