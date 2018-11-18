import React, { PureComponent } from 'react';
import {Button, Popover, TextField, withStyles} from '@material-ui/core';

class LoginBox extends PureComponent {
    state = {
        username: '',
        password: ''
    };

    handleLogin() {
        const {close, submit} = this.props;
        const {username, password} = this.state;
        close();
        submit(username, password);
    }

    handleRegister() {
        const {close, register} = this.props;
        const {username, password} = this.state;
        close();
        register(username, password);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {
        const {anchor, open, classes} = this.props;
        const {username, password} = this.state;

        return (
            <Popover
                anchorEl={anchor}
                className={classes.root}
                open={open}>
                <TextField
                    className={classes.input}
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={this.handleChange('username')}/>
                <TextField
                    className={classes.input}
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={this.handleChange('password')}/>
                <><Button className={classes.input} color="primary" onClick={this.handleLogin.bind(this)}>Login</Button>
                <Button color="primary" onClick={this.handleRegister.bind(this)}>Register</Button></>
            </Popover>
        )
    }
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    input: {
        display: 'flex',
        margin: 10,
        marginTop: 20,
    },
    btn: {
        display: 'flex',
        margin: 10,
    }
}

export default withStyles(styles)(LoginBox);
