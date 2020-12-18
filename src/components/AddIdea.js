import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createIdea } from '../redux/idea/ideaActions';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      marginTop: '100px',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
});

class AddIdea extends Component {
  state = {
    idea: {
      idea: null,
      description: null,
    },
  };

  componentDidUpdate(prevProps) {
    if (this.props.canRedirect) this.props.history.push('/');
  }

  handleChange = e => {
    const idea = { ...this.state.idea };
    idea[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ idea });
  };
  handleSubmit = e => {
    console.log(this.state.idea);
    e.preventDefault();
    const token = localStorage.getItem('token');
    // this.props.createIdea(this.state.idea, token);
    this.props.createIdea(this.state.idea, token);
  };
  render() {
    const { classes } = this.props;
    const { idea } = this.state;

    return (
      <div
        className={classes.root}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <form
          noValidate
          className={classes.form}
          autoComplete='off'
          onSubmit={this.handleSubmit}
        >
          <TextField
            id='filled-multiline-flexible'
            label='Idea'
            multiline
            rowsMax={4}
            value={idea.idea}
            onChange={this.handleChange}
            variant='filled'
            name='idea'
            autoFocus
          />

          <TextField
            id='filled-multiline-flexible'
            label='Description'
            multiline
            rowsMax={4}
            value={idea.description}
            onChange={this.handleChange}
            variant='filled'
            name='description'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Add Idea
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    canRedirect: state.idea.canRedirect,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createIdea: (idea, token) => dispatch(createIdea(idea, token)),
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AddIdea);
