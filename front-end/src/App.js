import React, { Component } from 'react';
import {AppHeader} from './components';
import {theme} from './ui';
import {MuiThemeProvider} from '@material-ui/core';
import './App.css';

class App extends Component {
  state = {
    user: null
  };

  async submitLogin(username) {
    const response = await fetch('/users', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username })}
    )
    if (response.status === 200) {
      const data = await response.json();
      this.setState({ 
        user: data.username,
        leagues: data.userLeagues,
        commissioner: data.isCommissioner
      })
    }
    // TODO: handle unsuccessful attempts
  }

  render() {
    const {user} = this.state;

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <AppHeader login={this.submitLogin.bind(this)} username={user} loggedIn={!!user}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
