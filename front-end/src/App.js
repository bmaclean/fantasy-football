import React, { Component } from 'react';
import {AppHeader} from './components';
import {theme} from './ui';
import {MuiThemeProvider} from '@material-ui/core';
import './App.css';

class App extends Component {
  state = {
    user: null,
  };

  submitLogin = (username) => {
    fetch('/users', {
      method: 'post',
      body: JSON.stringify({ username })})
      .then(res => res.json())
      .then(user => this.setState({
        user
      }))
  }

  render() {
    const {user} = this.state;

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <AppHeader login={this.submitLogin} username={user && user.name} loggedIn={!!user}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
