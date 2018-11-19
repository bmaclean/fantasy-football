import React, { PureComponent } from 'react';
import {LeagueUsers} from '../components';
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles, IconButton} from '@material-ui/core';
import {SwapHoriz} from '@material-ui/icons'

class TradePlayer extends PureComponent {

    state = {
        anchorEl: null,
        menuOpen: false,
        players: [],
        user: null,
        otherUser: null,
        otherTeam: [],
        playerSending: null,
        playerReceiving: null
    }

    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
    }

    openMenu(event) {
        this.setState({ anchorEl: event.currentTarget, menuOpen: true })
    };

    closeMenu() {
        this.setState({ anchorEl: null, menuOpen: false })
    };

    async select(state, name) {
        this.setState({ [state]: name });
        if (state === 'otherUser') {
            const newTeam = await this.updateOtherTeam(name);
            this.select('otherTeam', newTeam);
        }
    }; 

    async updateOtherTeam(username) {
        const {getTeam, user} = this.props;
        
        const newTeam = await getTeam(username);
        return newTeam;
    }

    updateDisplay(pid1, pid2) {
        this.setState({
            players: this.state.players
                .filter(player => player.pid !== pid1)
                .concat(this.getPlayerByPID(pid2, (this.state.otherTeam))),
            otherTeam: this.state.otherTeam
                .filter(player => player.pid !== pid2)
                .concat(this.getPlayerByPID(pid1, (this.state.players)))
        })
    }

    getPlayerByPID = (pid, list) => list.filter(player => player.pid === pid)

    render() {
        const {classes, league, trade, user} = this.props;
        const {anchorEl, menuOpen, players, otherUser, otherTeam, playerSending, playerReceiving} = this.state;

        const otherPlayers = otherTeam || [];
        const playerList = players || [];

        

        return (
          <>
          <Paper className={classes.tradeBox}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Position</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {playerList.map(player => (
                        <TableRow 
                            key={player.pid} 
                            selected={playerSending === player.pid}
                            onClick={() => {this.select('playerSending', player.pid)}}>
                            <TableCell>{player.team}</TableCell>
                            <TableCell>{player.firstName + ' ' + player.lastName}</TableCell>
                            <TableCell>{player.position}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </Paper>
          <IconButton 
            className={classes.tradeButton}
            disabled={!playerSending || !playerReceiving}
            onClick={() => {this.updateDisplay(playerSending, playerReceiving); trade(user, otherUser, playerSending, playerReceiving)}}>
                <SwapHoriz/>
          </IconButton>
          <Button
            className={classes.userMenu}
            onClick={this.openMenu.bind(this)}
            color='primary'
            variant='contained'
            id="otherUser">
            {otherUser || "Select User"}
          </Button>
          <LeagueUsers 
            league={league} 
            open={menuOpen} 
            omitUser={user}
            anchorEl={anchorEl} 
            close={this.closeMenu.bind(this)} 
            select={this.select.bind(this)}/>
          <Paper className={classes.tradeTwo}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Position</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {otherPlayers.map(player => (
                        <TableRow 
                            key={player.pid} 
                            selected={playerReceiving === player.pid}
                            onClick={() => {this.select('playerReceiving', player.pid)}}>
                            <TableCell>{player.team}</TableCell>
                            <TableCell>{player.firstName + ' ' + player.lastName}</TableCell>
                            <TableCell>{player.position}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </Paper>
          </>
        )
    }
}

const styles = {
    userMenu: {
        position: "absolute",
        marginTop: 85,
        marginLeft: 1000
    },
    tradeBox: {
        position: "absolute",
        marginTop: 130,
        marginLeft: 300,
        width: 500,
        elevation: 2
    },
    tradeTwo: {
        position: "absolute",
        marginTop: 130,
        marginLeft: 1000,
        width: 500,
        elevation: 2
    },
    tradeButton: {
        position: "absolute",
        marginTop: 300,
        marginLeft: 875,
        width: 50,
        elevation: 2
    },
    textShift: {
      marginLeft: 20
    }
}
export default withStyles(styles)(TradePlayer);
