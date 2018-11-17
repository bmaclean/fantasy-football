import React, { PureComponent } from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles,
    Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

class TradePlayer extends PureComponent {
    state = {
        players: []
    }

    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
    }

    render() {
        const {classes} = this.props;
        const {players} = this.state;
        debugger;
        var x;

        return (
          <Paper className={classes.tradeBox}>
            <p>Select player to trade</p>
            <button onclick="myFunction()">Trade</button>
            <input type="text" id="myText" value="Select user...">
            </input>
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
function myFunction() {
    var x = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = x;
}

const styles = {
    tradeBox: {
        position: "absolute",
        marginTop: 130,
        marginLeft: 400,
        width: 500,
        elevation: 2
    }
}
export default withStyles(styles)(TradePlayer);
