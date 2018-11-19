import React, { PureComponent } from 'react';
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';

class ScoresByWeek extends PureComponent {
    state = {
        scores: []
    }

    componentDidMount() {
        this.props.scores.then(scores => this.setState({ scores }))
    }

    render() {
        const {classes} = this.props;
        const {scores} = this.state;

        return (
            <Paper className={classes.teamTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Game Week</TableCell>
                            <TableCell>User 1</TableCell>
                            <TableCell>User 1 Score</TableCell>
                            <TableCell>User 2</TableCell>
                            <TableCell>User 2 Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scores.map(score => (
                            <TableRow key={score.gameweek}>
                                <TableCell>{score.gameweek}</TableCell>
                                <TableCell>{score.user1}</TableCell>
                                <TableCell>{score.user1score}</TableCell>
                                <TableCell>{score.user2}</TableCell>
                                <TableCell>{score.user2score}</TableCell>
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
export default withStyles(styles)(ScoresByWeek);
