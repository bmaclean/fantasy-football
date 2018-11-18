import React, { PureComponent } from 'react';
import {Menu, MenuItem, withStyles} from '@material-ui/core';

class LeagueUsers extends PureComponent {
    state = {
        users: []
    }

    async getUsers(league) {
        const response = await fetch('/league/users', {
            method: 'post',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ league })
        });
        if (response.status === 200) {
            const data = await response.json();
            this.setState({ users: data.users })
        }
    }

    handleSelect(event) {
        const {select, close, anchorEl} = this.props;
        select(anchorEl.id, event.target.innerText.trim());
        close();

    }

    componentDidMount() {
        this.getUsers(this.props.league);
    }

    render() {
        const {classes, anchorEl, open, close} = this.props;
        const {users} = this.state;
        const userList = users || [];

        return (
            <Menu anchorEl={anchorEl} open={open} onClose={close}>
                {userList.map(user => (
                    <MenuItem key={user} onClick={this.handleSelect.bind(this)}>{user}</MenuItem>
                ))}
            </Menu>
        )
    }
}

const styles = {
}
export default withStyles(styles)(LeagueUsers);
