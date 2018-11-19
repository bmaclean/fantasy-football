import React, { PureComponent } from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

class MyTeam extends PureComponent {
    state = {
        players: [],
        mvps: []
    }
    
    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
        this.checkMVP();
    }

    async checkMVP() {
        const {league} = this.props;
        const response = await fetch('/players/mvp', {
            method: 'post',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ league })
        })
        if (response.status === 200) {
            const data = await response.json();
            this.setState({
                mvps: data.map(player => player.pid)
            })
        }
    }

    remove(pid) {
        this.setState({
            players: this.state.players.filter(player => player.pid !== pid)
        })
    }

    render() {
        const {classes, dropPlayer} = this.props;
        const {players, mvps} = this.state;
        
        const playerList = players || [];

        return (
            <Paper className={classes.teamTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerList.map(player => (
                            <TableRow key={player.pid} className={mvps.includes(player.pid) ? classes.mvp : ''}>
                                <TableCell>{player.team}</TableCell>
                                <TableCell>{player.firstName + ' ' + player.lastName}</TableCell>
                                <TableCell>{player.position || 'FA'}</TableCell>
                                <TableCell>
                                    <Button 
                                        color="secondary"
                                        onClick={() => {this.remove(player.pid); dropPlayer(player.pid)}}>
                                        Drop
                                    </Button>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

const styles = {
    teamTable: {
        position: "absolute",
        marginTop: 130,
        marginLeft: 400,
        width: 700,
        elevation: 2
    },
    mvp: {
        backgroundColor: '#E3F2FD'
    }
}
export default withStyles(styles)(MyTeam);