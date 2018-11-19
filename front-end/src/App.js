import React, { PureComponent } from 'react';
import {AppHeader, AppMenu, MyTeam, TradePlayer, FreeAgents, PlayersTeams,
      HighestRankingUser, RemovePlayers, UpdateAlias, CreateMatch, ManageUsers,
      ViewMatchup, ScoresByWeek} from './components';
import {theme} from './ui';
import {MuiThemeProvider, Snackbar, withStyles} from '@material-ui/core';

class App extends PureComponent {
  state = {
    user: null,
    leagues: null,
    currentLeague: null,
    isCommissioner: null,
    commissionerAlias: "",
    page: "Home",
    showSnackbar: false,
    snackbarMessage: '',
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
        isCommissioner: data.isCommissioner,
        commissionerAlias: data.alias
      })
    } else {
      this.setState({
        showSnackbar: true,
        snackbarMessage: "That username or password does not exist."
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
    if (response.status === 201) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: "Registration successful!"
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
    if (response.status === 201) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Alias successfully updated!',
        commissionerAlias: alias
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
      body: JSON.stringify({ league: currentLeague })
    })
    if (response.status === 200) {
      const players = await response.json()
      return players;
    }
  }

  async getLeaderboard() {
    const leaguename = this.state.currentLeague;
    const response = await fetch('/leaderboard', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ leaguename })
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
    }
  }

  async getScoresByWeek() {
    const leaguename = this.state.currentLeague;
    const response = await fetch('/leaderboard/weekly', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ leaguename })
    });
    if (response.status === 200) {
      return await response.json();
    } else {
      return [];
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

  async getTeamDetails(username) {
    const {currentLeague} = this.state;
    const response = await fetch('/team/details', {
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

  async getMatchup(user1, user2, gameyear, gameweek) {
    const {currentLeague} = this.state;
    const response = await fetch('/matchups', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ user1, user2, gameyear, gameweek, leaguename: currentLeague })
    })
    if (response.status === 200) {
      return await response.json();
    } else  {
      return [];
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
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'User successfully added!',
      })
    } else {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'This user cannot be added.',
      })
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
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'User successfully dropped!',
      })
    } else {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'This user cannot be dropped.',
      })
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

  async trade(user1, user2, pid1, pid2) {
    const {user, currentLeague} = this.state;
    const response = await fetch('/team/trade', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // get players that play for username in league
      body: JSON.stringify({ user1, user2, pid1, pid2})
    })
    if (response.status === 200) {
      // TODO: toast response
      this.forceUpdate();
    }
  }

  setPage = page => {
    this.setState({ page });
  }

  render() {
    const {classes} = this.props;
    const {user, isCommissioner, currentLeague, page, showSnackbar, snackbarMessage, leagues, commissionerAlias} = this.state;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <AppMenu leagues={leagues} username={user} isCommissioner={isCommissioner} setPage={this.setPage.bind(this)} alias={commissionerAlias}/>
          <AppHeader login={this.submitLogin.bind(this)} register={this.registerUser.bind(this)} username={user} loggedIn={!!user}/>
          {page === "Create Match" && <CreateMatch league={currentLeague} submitMatchup={this.submitMatchup.bind(this)}/>}
          {page === "Manage Users" && <ManageUsers league={currentLeague} addUser={this.addUser.bind(this)} dropUser={this.dropUser.bind(this)}/>}
          {page === "My Team" && <MyTeam dropPlayer={this.dropPlayer.bind(this)} players={this.getTeam(user)} />}
          {page === "Trade Player" && <TradePlayer user={user} trade={this.trade.bind(this)} league={currentLeague} players={this.getTeam(user)} getTeam={this.getTeam.bind(this)}/>}
          {page === "Free Agents" && <FreeAgents addPlayer={this.addPlayer.bind(this)} players={this.getFreeAgents()}/>}
          {page === "Players Teams" && <PlayersTeams players={this.getTeamDetails(user)}/>}
          {page === "View Matchup" && <ViewMatchup league={currentLeague} getMatchup={this.getMatchup.bind(this)}/>}
          {page === "Highest Ranking User" && <HighestRankingUser users={this.getLeaderboard()}/>}
          {page === "Top Scores By Week" && <ScoresByWeek scores={this.getScoresByWeek()}/>}
          {page === "Update Alias" && <UpdateAlias updatealias={this.updatealias.bind(this)}/>}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={showSnackbar}
            onClose={() => {this.setState({showSnackbar: false})}}
            autoHideDuration={2000}
            message={<span id="message-id">{snackbarMessage}</span>}
          />
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
