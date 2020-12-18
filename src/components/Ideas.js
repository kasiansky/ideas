import React, { Component } from 'react';
import Idea from './Idea';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { getAllIdeas, deleteIdea } from '../redux/idea/ideaActions';
import { getUserFromLS } from '../redux/auth/loginAction';

const useStyles = () => ({
  gridContainer: {
    marginTop: '100px',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
});

class Ideas extends Component {
  componentDidMount() {
    this.props.getAllIdeas();
    console.log(this.props.ideas);
    this.props.getUserFromLS();
    console.log('UUUUUUUUUSSSSERRRRRRR', this.props.currentUser);
  }
  handleDelete(id) {
    const token = localStorage.getItem('token');
    this.props.deleteIdea(id, token);
  }

  render() {
    const { classes } = this.props;
    const { ideas } = this.props;

    return (
      <>
        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justify='center'
        >
          {ideas.map(idea => (
            <Grid item xs={12} sm={6} md={4}>
              <Idea
                key={idea.id}
                idea={idea}
                onDelete={() => this.handleDelete(idea.id)}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    ideas: state.idea.ideas,
    currentUser: state.auth.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllIdeas: () => dispatch(getAllIdeas()),
    deleteIdea: (id, token) => dispatch(deleteIdea(id, token)),
    getUserFromLS: () => dispatch(getUserFromLS()),
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Ideas);
