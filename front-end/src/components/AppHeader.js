import React, { PureComponent } from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography, withStyles} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {LoginBox} from '../components';

class AppHeader extends PureComponent {
    state = {
        anchorEl: null,
        loginOpen: false,
    };

    openLogin(event) {
        this.setState({ anchorEl: event.currentTarget, loginOpen: true })
    };

    closeLogin() {
        this.setState({ anchorEl: null, loginOpen: false })
    }

    render() {
        const {classes, username, loggedIn, login} = this.props;
        const {anchorEl, loginOpen} = this.state;

        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.title}>
                        Fantasy Football
                    </Typography>

                    {!loggedIn && 
                        <Button color="inherit" onClick={this.openLogin.bind(this)}>Login</Button>
                    }
                    {loggedIn && 
                        <Typography color="inherit"> Welcome, {username}!</Typography>
                    }
                    <LoginBox anchor={anchorEl} open={loginOpen} close={this.closeLogin.bind(this)} submit={login}/>
                </Toolbar>
            </AppBar>
        )
    }
}

const styles = {
    title: {
        textAlign: 'left',
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
}

export default withStyles(styles)(AppHeader);