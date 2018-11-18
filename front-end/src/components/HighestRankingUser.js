import React, { PureComponent } from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

class HighestRankingUser extends PureComponent {
    state = {
        users: []
    }

    componentDidMount() {
        this.props.users.then(users => this.setState({ users }))
    }

    render() {
        const {classes} = this.props;
        const {users} = this.state;
        let rank = 0;

        return (
            <Paper className={classes.teamTable}>
              <h3> The highest ranking user in your league is: {users.length > 0 ? users[0].username : ""}</h3>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Total Score</TableCell>
                            {/* <TableCell>Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={++rank}>
                                <TableCell>{rank}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.score}</TableCell>
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
export default withStyles(styles)(HighestRankingUser);
