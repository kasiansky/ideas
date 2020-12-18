import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { postComment } from '../redux/comment/commentActions';

const useStyles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
});
class AddComment extends Component {
  state = {
    comment: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createComment(this.state, this.props.ideaId);
  };
  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { comment } = this.state;
    return (
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={this.handleSubmit}
      >
        <TextField
          id='outlined-basic'
          multiline
          rowsMax={4}
          label='Add Comment'
          variant='outlined'
          onChange={this.handleChange}
          name='comment'
          value={comment}
          autoFocus
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     currentIdea: state.idea.currentIdea,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    createComment: (comment, ideaId) => dispatch(postComment(comment, ideaId)),
  };
};

export default compose(
  withStyles(useStyles),
  connect(null, mapDispatchToProps)
)(AddComment);
