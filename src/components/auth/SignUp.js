import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as RRDlink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { signUp } from '../../redux/actions/signUpAction';
import { signUp } from '../../redux/auth/signUpAction';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    },
  };

  copyright = () => {
    return (
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://material-ui.com/'>
          Mark
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state);
    this.props.signUp(this.state.user);
    this.props.history.push('/login');
  };
  handleChange = e => {
    const user = { ...this.state.user };
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user });
  };

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={user.firstName}
                  onChange={this.handleChange}
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={user.lastName}
                  onChange={this.handleChange}
                  variant='outlined'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={user.username}
                  onChange={this.handleChange}
                  variant='outlined'
                  required
                  fullWidth
                  id='username'
                  label='User Name'
                  name='username'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={user.password}
                  onChange={this.handleChange}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <RRDlink to='/login' variant='body2'>
                  Already have an account? Sign in
                </RRDlink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>{this.copyright}</Box>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUp(user)),
  };
};

export default compose(
  withStyles(useStyles),
  connect(null, mapDispatchToProps)
)(SignUp);
