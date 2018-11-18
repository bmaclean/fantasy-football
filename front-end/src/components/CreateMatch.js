import React, { PureComponent } from 'react';
import {LeagueUsers} from '../components';
import {Button, Paper, withStyles} from '@material-ui/core';

class CreateMatch extends PureComponent {
    state = {
        anchorEl: null,
        menuOpen: false,
        user1: null,
        user2: null
    }

    openMenu(event) {
        this.setState({ anchorEl: event.currentTarget, menuOpen: true })
    };

    closeMenu() {
        this.setState({ anchorEl: null, menuOpen: false })
    }

    selectUser(user, name) {
        this.setState({ [user]: name });
    }

    render() {
        const {classes, league} = this.props;
        const {anchorEl, menuOpen, user1, user2} = this.state

        return (
            <Paper className={classes.matchForm}>
                <span></span>
                <Button 
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.openMenu.bind(this)}
                    className={classes.user1}
                    color='secondary'
                    variant='outlined'
                    id='user1'
                    > 
                        {user1 || "User 1"}
                </Button>
                <Button 
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.openMenu.bind(this)}
                    className={classes.vs}
                    color='grey'
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
                <span></span>
                <LeagueUsers league={league} open={menuOpen} anchorEl={anchorEl} close={this.closeMenu.bind(this)} select={this.selectUser.bind(this)} />
            </Paper>
        )
    }
}

const styles = {
    user1: {
        marginTop: 40
    },
    user2: {
        marginTop: 40
    },
    vs: {
        marginTop: 40
    },
    matchForm: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        elevantion: 3,
        position: 'absolute',
        display: 'flex',
        marginLeft: 400,
        marginTop: 150,
        width: 600,
        height: 300,
    }
}
export default withStyles(styles)(CreateMatch);
