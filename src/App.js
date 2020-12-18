import React, { Component } from 'react';
import NavBar from './components/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import Ideas from './components/Ideas';
import AddIdea from './components/AddIdea';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar />
          <Switch>
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={LogIn} />
            <Route
              path='/addIdea'
              component={AddIdea}
              render={() => {
                if (!this.props.currentUser) return <Redirect to='/login' />;
              }}
            />
            <Route path='/' component={Ideas} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(App);
