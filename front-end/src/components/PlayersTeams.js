import React, { PureComponent } from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

class PlayerTeams extends PureComponent {
    state = {
        players: []
    }

    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
    }

    render() {
        const {classes} = this.props;
        const {players} = this.state;

        const playerList = players || [];

        return (
            <Paper className={classes.teamTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Player</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Stadium</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerList.map(player => (
                            <TableRow key={player.pid}>
                                <TableCell>{`${player.firstname.trim()} ${player.lastname.trim()}`}</TableCell>
                                <TableCell>{player.teamname}</TableCell>
                                <TableCell>{player.city}</TableCell>
                                <TableCell>{player.stadium}</TableCell>
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
        width: 600,
        elevation: 2
    }
}
export default withStyles(styles)(PlayerTeams);
