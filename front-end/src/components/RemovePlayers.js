import React, { PureComponent } from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

class MyTeam extends PureComponent {
    state = {
        players: [],
        d: null
    }

    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
    }

    handleClick(){
      if(this.d){
        /* TODO: remove PID from table */
      }
    }

    render() {
        const {classes} = this.props;
        const {players} = this.state;
        debugger;

        return (
            <Paper className={classes.teamTable}>
            <h className={classes.textShift}> Select Player to remove </h>
             <button onClick={this.handleClick()}> Remove </button>
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
                                  <TableCell><button onClick={this.d = player.pid}>
                                  {player.firstName + ' ' + player.lastName}</button></TableCell>
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
    },
    textShift: {
      marginTop: 20,
      marginLeft: 20
    }
}
export default withStyles(styles)(MyTeam);
