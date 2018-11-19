import React, { PureComponent } from 'react';
import {LeagueUsers} from '../components';
import {Button, Menu, MenuItem, Paper, withStyles, Table,
        TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {Years, Weeks} from '../assets';

const ITEM_HEIGHT = 48;

class ViewMatchup extends PureComponent {
    state = {
        anchorEl: null,
        menuOpen: false,
        user1: null,
        user2: null,
        year: null,
        week: null,
        yearMenuOpen: false,
        weekMenuOpen: false,
        matchups: []
    }

    handleYearUpdate = (event) => {
        this.select('year', event.target.innerText.trim());
        this.setState({ anchorEl: null, yearMenuOpen: false })
    }

    handleWeekUpdate = (event) => {
        this.select('week', event.target.innerText.trim());
        this.setState({ anchorEl: null, weekMenuOpen: false })
    }

    openMenu(event) {
        this.setState({ anchorEl: event.currentTarget, menuOpen: true })
    };

    toggleYearMenu(event) {
        this.setState({ anchorEl: event.currentTarget, yearMenuOpen: !this.state.yearOpen })
    }

    toggleWeekMenu(event) {
        this.setState({ anchorEl: event.currentTarget, weekMenuOpen: !this.state.weekOpen })
    }

    closeMenu() {
        this.setState({ anchorEl: null, menuOpen: false })
    }

    select(state, name) {
        this.setState({ [state]: name });
    }

    handleMatchupSubmit = async () => {
        const {getMatchup} = this.props;
        const {user1, user2, year, week} = this.state;
        const result = await getMatchup(user1, user2, year, week);
        
        this.setState({ matchups: result })
    }

    render() {
        const {classes, league} = this.props;
        const {anchorEl, menuOpen, user1, user2, year, week, yearMenuOpen, weekMenuOpen} = this.state

        return (
            <Paper className={classes.matchForm}>
                <div className={classes.centeredRow}>
                    <h2>View Matchup</h2>
                </div>
                <div className={classes.formRow}>
                    <span/>
                    <Button
                        onClick={this.openMenu.bind(this)}
                        className={classes.user1}
                        color='secondary'
                        variant='outlined'
                        id='user1'
                        >
                            {user1 || "User 1"}
                    </Button>
                    <Button
                        onClick={this.openMenu.bind(this)}
                        className={classes.vs}
                        color='secondary'
                        variant='outlined'
                        disabled
                        >
                            vs.
                    </Button>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.openMenu.bind(this)}
                        className={classes.user2}
                        color='secondary'
                        variant='outlined'
                        id='user2'
                        >
                            {user2 || "User 2"}
                    </Button>
                    <span/>
                </div>
                {/* TODO: abstract formRow into component */}
                <div className={classes.formRow}>
                    <span/>
                    {/* TODO: abstract all button/menu combinations into custom menu component */}
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.toggleYearMenu.bind(this)}
                        className={classes.user2}
                        color='primary'
                        variant="contained"
                        id='year'
                        >
                            {year || "Year"}
                    </Button>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.toggleWeekMenu.bind(this)}
                        className={classes.user2}
                        color='primary'
                        variant="contained"
                        id='week'
                        >
                            {week || "Week"}
                    </Button>
                    <span/>
                </div>
                <LeagueUsers league={league} open={menuOpen} anchorEl={anchorEl} close={this.closeMenu.bind(this)} select={this.select.bind(this)} />
                <Menu
                    anchorEl={anchorEl}
                    open={yearMenuOpen}
                    PaperProps={{
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                        }}}
                    close={this.toggleYearMenu.bind(this)}>
                    {Years.map(year => (
                        <MenuItem key={year} onClick={this.handleYearUpdate.bind(this)}>{year}</MenuItem>
                    ))}
                </Menu>
                <Menu
                    anchorEl={anchorEl}
                    open={weekMenuOpen}
                    PaperProps={{
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                        }}}
                    close={this.toggleWeekMenu.bind(this)}>
                    {Weeks.map(week => (
                        <MenuItem key={week} onClick={this.handleWeekUpdate.bind(this)}>{week}</MenuItem>
                    ))}
                </Menu>
                <div className={classes.centeredRow}>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMatchupSubmit.bind(this)}
                        color={'secondary'}
                        variant="contained"
                        >
                            Submit
                    </Button>
                </div>
                {this.state.matchups.length > 0 && <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User 1</TableCell>
                            <TableCell>User 1 Score</TableCell>
                            <TableCell>User 2</TableCell>
                            <TableCell>User 2 Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.matchups.map(matchup => (
                            <TableRow key={matchup.user1}>
                                <TableCell>{matchup.user1}</TableCell>
                                <TableCell>{matchup.user1score}</TableCell>
                                <TableCell>{matchup.user2}</TableCell>
                                <TableCell>{matchup.user2score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
            </Paper>
        )
    }
}

const styles = {
    matchForm: {
        flexDirection: 'column',
        elevation: 3,
        position: 'absolute',
        display: 'flex',
        marginLeft: 400,
        marginTop: 130,
        width: 600,
        height: 400,
    },
    formRow: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: 40
    },
    centeredRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 40
    },
    teamTable: {
        position: "absolute",
        marginTop: 500,
        marginLeft: 400,
        width: 600,
        elevation: 2
    }

}

export default withStyles(styles)(ViewMatchup);
