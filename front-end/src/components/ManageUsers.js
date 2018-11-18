import React, { PureComponent } from 'react';
import {Button, Paper, TextField, withStyles} from '@material-ui/core';
import {LeagueUsers} from '../components';

class ManageUsers extends PureComponent {
    state = {
        anchorEl: null,
        menuOpen: false,
        userToAdd: null,
        userToDrop: null
    }

    openMenu(event) {
        this.setState({ anchorEl: event.currentTarget, menuOpen: true })
    };

    closeMenu() {
        this.setState({ anchorEl: null, menuOpen: false })
    };

    select(state, name) {
        this.setState({ [state]: name });
    };

    handleAddUser() {
        const {userToAdd} = this.state;
        const {addUser, league} = this.props;
        addUser(userToAdd, league)
    }

    handleDropUser() {
        const {userToDrop} = this.state;
        const {dropUser, league} = this.props;
        dropUser(userToDrop, league)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {
        const {classes, league} = this.props;
        const {menuOpen, anchorEl, userToAdd, userToDrop} = this.state;

        return (
            <>
                <Paper className={classes.addUserCard}>
                    <div className={classes.centeredRow}>
                        <TextField
                            label="Add User"
                            margin="normal"
                            value={userToAdd}
                            onChange={this.handleChange('userToAdd')}/>
                    </div>
                    <div className={classes.centeredRow}>
                        <Button
                            onClick={this.handleAddUser.bind(this)}
                            color='primary'
                            variant='contained'>
                            Add
                        </Button>
                    </div>
                </Paper>
                <Paper className={classes.dropUserCard}>
                    <div className={classes.centeredRow}>
                        <Button
                            onClick={this.openMenu.bind(this)}
                            color='primary'
                            variant='outlined'
                            id="userToDrop">
                            {userToDrop || "Drop User"}
                        </Button>
                    </div>
                    <div className={classes.centeredRow}>
                        <Button
                            onClick={this.handleDropUser.bind(this)}
                            color='primary'
                            variant='contained'>
                            Drop
                        </Button>
                    </div>
                    <LeagueUsers league={league} open={menuOpen} anchorEl={anchorEl} close={this.closeMenu.bind(this)} select={this.select.bind(this)}/>
                </Paper>
            </>
        )
    }
}

const styles = {
    addUserCard: {
        flexDirection: 'column',
        elevation: 3,
        position: 'absolute',
        display: 'flex',
        marginLeft: 400,
        marginTop: 380,
        width: 400,
        height: 200,
    },
    dropUserCard: {
        flexDirection: 'column',
        elevation: 3,
        position: 'absolute',
        display: 'flex',
        marginLeft: 400,
        marginTop: 130,
        width: 400,
        height: 200,
    },
    // TODO: formRow should be component
    centeredRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 40
    }
}
export default withStyles(styles)(ManageUsers);