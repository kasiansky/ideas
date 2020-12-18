import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteComment } from '../redux/comment/commentActions';

class Comment extends Component {
  handleDelete = () => {
    this.props.onDelete(this.props.comment.id, this.props.ideaId);
  };
  render() {
    const { comment, currentUser, ideaId } = this.props;
    return (
      <div>
        <h3>Comment:</h3>
        <p>{comment.comment}</p>

        {currentUser.id === comment.author.id && (
          <Button
            variant='contained'
            color='secondary'
            onClick={this.handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDelete: (id, ideaId) => dispatch(deleteComment(id, ideaId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
