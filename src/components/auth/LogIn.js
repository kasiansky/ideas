import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as RRDLink, withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginUser } from '../../redux/auth/loginAction';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LogIn extends Component {
  state = {
    currentUser: {
      username: null,
      password: null,
    },
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser) this.props.history.push('/');
  }
  componentWillUnmount() {
    localStorage.setItem('currentUser', JSON.stringify(this.props.currentUser));
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.currentUser);
    // this.props.login(this.state.currentUser);
    this.props.loginUser(this.state.currentUser);
  };
  handleChange = e => {
    const currentUser = { ...this.state.currentUser };
    currentUser[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ currentUser });
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
  render() {
    const { classes } = this.props;
    const { currentUser } = this.state;

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <TextField
              value={currentUser.username}
              onChange={this.handleChange}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='User Name'
              name='username'
              autoFocus
            />
            <TextField
              value={currentUser.password}
              onChange={this.handleChange}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RRDLink to='signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </RRDLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>{this.copyright}</Box>
      </Container>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     currentUserData: state.currentUser,
//   };
// };
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginUser: currentUser => dispatch(loginUser(currentUser)),
  };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(LogIn);
