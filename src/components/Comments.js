import React, { Component } from 'react';
import Comment from './Comment';
import { Button } from '@material-ui/core';
import AddComment from './AddComment';
import { connect } from 'react-redux';
import { getComment } from '../redux/comment/commentActions';

class Comments extends Component {
  state = {
    visible: false,
  };

  render() {
    const { comments, id } = this.props.idea;
    console.log('COMMENTS', comments);
    return (
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            this.setState({
              visible: !this.state.visible,
            });
          }}
        >
          Add Comment
        </Button>
        {this.state.visible ? <AddComment ideaId={id} /> : null}

        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} ideaId={id} />
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // comments: state.comment.comments[ideaId],
    // comments: state.idea.ideas.comments
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showComments: id => dispatch(getComment(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
