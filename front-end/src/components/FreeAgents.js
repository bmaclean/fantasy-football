import React, { PureComponent } from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

class FreeAgents extends PureComponent {
    state = {
        players: []
    }

    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
    }

    render() {
        const {classes, addPlayer} = this.props;
        const {players} = this.state;
        const playerList = players || [];
        

        return (
            <Paper className={classes.paperTable}>
                <Table className={classes.teamTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Team</TableCell>
                            <TableCell className={classes.head}>Name</TableCell>
                            <TableCell className={classes.head}>Position</TableCell>
                            <TableCell className={classes.head}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerList.map(player => (
                            <TableRow key={player.pid}>
                                <TableCell>{player.team || "FA"}</TableCell>
                                <TableCell>{player.firstName + ' ' + player.lastName}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell>
                                    <Button 
                                        color="primary"
                                        variant="outlined"
                                        onClick={() => {addPlayer(player.pid)}}>
                                        Add
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
    paperTable: {
        position: "absolute",
        marginTop: 130,
        marginLeft: 400,
        width: 700,
        elevation: 2,
        maxHeight: 500,
        overflow: "scroll"
    },
    head: {
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10
    }
}
export default withStyles(styles)(FreeAgents);
