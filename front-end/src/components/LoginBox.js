import React, { PureComponent } from 'react';
import {Button, Popover, TextField, withStyles} from '@material-ui/core';

class LoginBox extends PureComponent {
    state = {
        username: '',
    };

    handleLogin() {
        const {close, submit} = this.props;
        const {username} = this.state;
        close();
        submit(username);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {
        const {anchor, open, classes} = this.props;
        const {username} = this.state;

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
                <Button className={classes.input} color="primary" onClick={this.handleLogin.bind(this)}>Login</Button>
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