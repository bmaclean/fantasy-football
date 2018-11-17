import React, { PureComponent } from 'react';
import {AppHeader, AppMenu, MyTeam, TradePlayer, DraftPlayer, PlayersTeams,
      HighestRankingUser, RemovePlayers, UpdateUsername, CreateNewMatch} from './components';
import {theme} from './ui';
import {MuiThemeProvider, withStyles} from '@material-ui/core';

class App extends PureComponent {
  state = {
    user: null,
    leagues: null,
    currentLeague: null,
    isCommissioner: null,
    page: "Home"
  };

  async submitLogin(username) {
    const response = await fetch('/users', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username })
    })
    if (response.status === 200) {
      const data = await response.json();
      this.setState({
        user: data.username,
        leagues: data.userLeagues,
        currentLeage: data.userLeagues[0],
        isCommissioner: data.isCommissioner
      })
    }
    // TODO: handle unsuccessful attempts
  }

  async getTeam() {
    const {currentLeague} = this.state;
    const response = await fetch('/team', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ currentLeague })
    })
    const players = await response.json()
    return players;
  }
  async getTeam(username) {
    const {currentLeague} = this.state;
    const response = await fetch('/team', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ username, currentLeague })
    })
    const players = await response.json()
    return players;
  }

  setPage = page => {
    this.setState({ page });
  }

  render() {
    const {classes} = this.props;
    const {user, isCommissioner, leagues, page} = this.state;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <AppMenu username={user} isCommissioner={isCommissioner} setPage={this.setPage.bind(this)}/>
          <AppHeader login={this.submitLogin.bind(this)} username={user} loggedIn={!!user}/>
          {page === "My Team" && <MyTeam players={this.getTeam(user)} />}
          {page === "Trade Player" && <TradePlayer players={this.getTeam(user)}/>}
          {page === "Draft Player" && <DraftPlayer players={this.getTeam()}/>}
          {page === "Players Teams" && <PlayersTeams players={this.getTeam(user)}/>}
          {page === "Highest Ranking User" && <HighestRankingUser username={user}/>}
          {page === "Remove Players" && <RemovePlayers players={this.getTeam(user)} />}
          {page === "Update Username" && <UpdateUsername/>}
          {page === "Create New Match" && <CreateNewMatch/>}
        </MuiThemeProvider>
      </div>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    width: "100%",
    backgroundColor: '#EEEEEE'
  }
}
export default withStyles(styles)(App);
