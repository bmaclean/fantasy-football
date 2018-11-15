import React, { Component } from 'react';
import {AppHeader} from './components';
import {theme} from './ui';
import {MuiThemeProvider} from '@material-ui/core';
import './App.css';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    // TODO: remove this - proof of concept only
    fetch('/users')
      .then(res => res.json())
      .then(res => console.log(JSON.stringify(res)));
  }

  submitLogin = (name) => {
    // TODO: attempt login by API call
    this.setState({
      user: {name}
    })
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
