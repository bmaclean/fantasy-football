import React, { PureComponent } from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

class MyTeam extends PureComponent {
    state = {
        players: []
    }
    
    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
    }

    render() {
        const {classes} = this.props;
        const {players} = this.state;
        

        return (
            <Paper className={classes.teamTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            {/* <TableCell>Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.map(player => (
                            <TableRow key={player.pid}>
                                <TableCell>{player.team}</TableCell>
                                <TableCell>{player.firstName + ' ' + player.lastName}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                {/* <TableCell>*drop button*</TableCell> */}
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
        width: 500,
        elevation: 2
    }
}
export default withStyles(styles)(MyTeam);