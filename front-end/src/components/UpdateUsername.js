import React, { PureComponent } from 'react';
import {Paper, Typography, withStyles} from '@material-ui/core';

class MyTeam extends PureComponent {
  state = {
      username: []
  }
  componentDidMount() {
      // this.props.user.then(username => this.setState({ username }))
  }

    render() {
        const {classes} = this.props;
        const {username} = this.state;
        debugger;

        return (
            <Paper className={classes.teamTable}>
                <h> Enter your desired username:</h>
                <input type="text" id="myText" value=" ">
                </input>
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
export default withStyles(styles)(MyTeam);
