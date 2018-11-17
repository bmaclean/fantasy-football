import React, { PureComponent } from 'react';
import {AppBar, Button, Toolbar, Typography, withStyles} from '@material-ui/core';
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
        const {classes, username, loggedIn, login, register} = this.props;
        const {anchorEl, loginOpen} = this.state;

        return (
            <AppBar color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.title}>
                        Fantasy Football
                    </Typography>

                    {!loggedIn &&
                        <Button color="inherit" onClick={this.openLogin.bind(this)}>Login</Button>
                    }
                    {loggedIn &&
                        <Typography color="inherit"> Welcome, {username}!</Typography>
                    }
                    <LoginBox anchor={anchorEl} open={loginOpen} close={this.closeLogin.bind(this)} submit={login} register={register}/>
                </Toolbar>
            </AppBar>
        )
    }
}

const styles = {
    appBar: {
        flexShrink: 1,
        position: "relative"
    },
    title: {
        textAlign: 'left',
        flexGrow: 1,
    },
}

export default withStyles(styles)(AppHeader);
