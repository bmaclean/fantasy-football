import React, { PureComponent } from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles,
    Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

class TradePlayer extends PureComponent {

    state = {
        players: [],
        user: null,
        playergive: null,
        playerget: null
    }

    componentDidMount() {
        this.props.players.then(players => this.setState({ players }))
    }
    handleGive(){
      if(this.playergive){
        /* TODO: remove PID from table, add to other */
      }
    }
    handleGet(){
      if(this.playerget){
        /* TODO: add PID from table, remove from other */
      }
    }
    render() {
        const {classes} = this.props;
        const {players} = this.state;
        debugger;
        var x;

        return (
          <>
          <Paper className={classes.tradeBox}>
            <p className={classes.textShift}>Select your player to trade</p>
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
                            <TableCell><button onClick={this.playergive = player.pid}>
                              {player.firstName + ' ' + player.lastName}</button></TableCell>
                            <TableCell>{player.position}</TableCell>
                            {/* <TableCell>*drop button*</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </Paper>
          <Paper className={classes.tradeButton}>
          <button onclick="myFunction()">Trade</button>
          </Paper>
          <Paper className={classes.tradeTwo}>
            <p className={classes.textShift}>Select player to recieve and user to trade with</p>
              <input className={classes.textShift} type="text" id="myText" value={this.state.value}
                onChange={this.handleChange}/>
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
                            <TableCell><button onClick={this.playerget = player.pid}>
                              {player.firstName + ' ' + player.lastName}</button></TableCell>
                            <TableCell>{player.position}</TableCell>
                            {/* <TableCell>*drop button*</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </Paper>
          </>
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
        marginLeft: 300,
        width: 400,
        elevation: 2
    },
    tradeTwo: {
        position: "absolute",
        marginTop: 130,
        marginLeft: 750,
        width: 400,
        elevation: 2
    },
    tradeButton: {
        position: "absolute",
        marginTop: 300,
        marginLeft: 700,
        width: 50,
        elevation: 2
    },
    textShift: {
      marginLeft: 20
    }
}
export default withStyles(styles)(TradePlayer);
