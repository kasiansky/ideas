import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AppBar, Container, Toolbar, Typography, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 4,
  },
});

class NavBar extends Component {
  state = {
    user: localStorage.getItem('token'),
  };
  render() {
    const { classes } = this.props;
    const { currentUser } = this.props;

    console.log('NAVBAR CURRENT USER: ', currentUser, this.props);

    return (
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              IDEAS APP
            </Typography>

            {!currentUser && (
              <>
                <Box mr={3}>
                  <Button
                    component={Link}
                    to='/signup'
                    color='secondary'
                    variant='contained'
                  >
                    Sign Up
                  </Button>
                </Box>
                <Box mr={3}>
                  <Button
                    component={Link}
                    to='/login'
                    color='inherit'
                    variant='outlined'
                  >
                    Log In
                  </Button>
                </Box>
                <Button component={Link} to='/' variant='contained'>
                  IDEAS
                </Button>
              </>
            )}
            {currentUser && (
              <>
                <h3 style={{ marginRight: '40px' }}>
                  Hello {currentUser.username}
                </h3>

                <Box mr={3}>
                  <Button component={Link} to='/addIdea' variant='contained'>
                    Add Idea
                  </Button>
                </Box>
                <Box mr={3}>
                  <Button component={Link} to='/' variant='contained'>
                    IDEAS
                  </Button>
                </Box>
                <Box mr={3}>
                  <Button
                    component={Link}
                    to='/'
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.replace('/login');
                    }}
                  >
                    Log Out
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, null)
)(NavBar);
