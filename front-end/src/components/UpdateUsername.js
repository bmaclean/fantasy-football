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
        

        return (
            <Paper className={classes.teamTable}>
                <h> Enter your desired username:</h>
                  <input className={classes.textShift} type="text" id="myText" value={this.state.value}
                    onChange={this.handleChange}/>
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
