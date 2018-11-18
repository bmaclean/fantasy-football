import React, { PureComponent } from 'react';
import {AppHeader, AppMenu, MyTeam, TradePlayer, FreeAgents, PlayersTeams,
      HighestRankingUser, RemovePlayers, UpdateAlias, CreateMatch, ManageUsers} from './components';
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

  async submitLogin(username, password) {
    const response = await fetch('/users/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username, password })
    })
    if (response.status === 200) {
      const data = await response.json();
      this.setState({
        user: data.username,
        leagues: data.userLeagues,
        currentLeague: data.userLeagues[0],
        isCommissioner: data.isCommissioner
      })
    }
    // TODO: handle unsuccessful attempts
  }

  async dropPlayer(pid) {
  const username = this.state.user;
  const leaguename = this.state.currentLeague;
   const response = await fetch('/players/drop', {
     method: 'post',
     headers: {
       "Content-Type": "application/json; charset=utf-8",
     },
     body: JSON.stringify({ pid, username, leaguename }) /* */
   })
   // TODO: handle unsuccessful attempts
 }

  async registerUser(username, password) {
    const response = await fetch('/users/register', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ username, password })
    })
    if (response.status === 200) {
      const data = await response.json();
      this.setState({
        user: data.username,
        isCommissioner: data.isCommissioner
      })
    }
    // TODO: handle unsuccessful attempts
  }

  async updatealias(alias) {
    const username = this.state.user;

    const response = await fetch('/users/updatealias', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ alias, username })
    })
    if (response.status === 200) {
      const data = await response.json();
      this.setState({
        user: data.username,
        isCommissioner: data.isCommissioner
      })
    }
    // TODO: handle unsuccessful attempts
  }

  async getFreeAgents() {
    const {currentLeague} = this.state;
    const response = await fetch('/players/freeagents', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ currentLeague })
    })
    if (response.status === 200) {
      const players = await response.json()
      return players;
    }
  }

  async getTeam(username) {
    const {currentLeague} = this.state;
    const response = await fetch('/team', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ username, league: currentLeague })
    })
    if (response.status === 200) {
      const players = await response.json()
      return players;
    }
  }

  async submitMatchup(user1, user2, year, week) {
    const {currentLeague} = this.state;
    const response = await fetch('/matchups/new', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ user1, user2, year, week, league: currentLeague })
    })
    if (response.status === 200) {
      // TODO: toast response
    }
  }

  async addUser(username, league) {
    const response = await fetch('/league/users/add', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ username, league })
    })
    if (response.status === 200) {
      // TODO: toast response
    }
  }

  // TODO: all of these server calls can be paramaterized by body content and endpoint (and potential toast message)
  //        and centralized to a single callServer method
  async dropUser(username, league) {
    const response = await fetch('/league/users/drop', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ username, league })
    })
    if (response.status === 200) {
      // TODO: toast response
    }
  }

  async addPlayer(pid) {
    const {user, currentLeague} = this.state;
    const response = await fetch('/players/add', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ pid, leaguename: currentLeague, username: user })
    })
    if (response.status === 200) {
      // TODO: toast response
    }
  }

  setPage = page => {
    this.setState({ page });
  }

  render() {
    const {classes} = this.props;
    const {user, isCommissioner, currentLeague, page} = this.state;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <AppMenu username={user} isCommissioner={isCommissioner} setPage={this.setPage.bind(this)}/>
          <AppHeader login={this.submitLogin.bind(this)} register={this.registerUser.bind(this)} username={user} loggedIn={!!user}/>
          {page === "Create Match" && <CreateMatch league={currentLeague} submitMatchup={this.submitMatchup.bind(this)}/>}
          {page === "Manage Users" && <ManageUsers league={currentLeague} addUser={this.addUser.bind(this)} dropUser={this.dropUser.bind(this)}/>}
          {page === "My Team" && <MyTeam players={this.getTeam(user)} />}
          {page === "Trade Player" && <TradePlayer players={this.getTeam(user)}/>}
          {page === "Free Agents" && <FreeAgents addPlayer={this.addPlayer.bind(this)} players={this.getFreeAgents()}/>}
          {page === "Players Teams" && <PlayersTeams players={this.getTeam(user)}/>}
          {page === "Highest Ranking User" && <HighestRankingUser username={user}/>}
          {page === "Remove Players" && <RemovePlayers players={this.getTeam(user)} dropPlayer={this.dropPlayer.bind(this)}/>}
          {page === "Update Alias" && <UpdateAlias updatealias={this.updatealias.bind(this)}/>}
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
