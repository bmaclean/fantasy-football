import React, { PureComponent } from 'react';
import {Paper, Typography, withStyles, Button, TextField} from '@material-ui/core';

class MyTeam extends PureComponent {
  state = {
      alias: ''
  }

  updateAlias() {
      const {updatealias} = this.props;
      const {alias} = this.state;
      
      debugger;
      updatealias(alias);
  }

  handleChange = alias => event => {
      this.setState({
          [alias]: event.target.value,
      });
  }

    render() {
        const {classes} = this.props;
        const {alias} = this.state;
        debugger;

        return (
            <Paper className={classes.teamTable}>
              <TextField
                  className={classes.textPosition}
                  className={classes.input}
                  label="Enter a new alias"
                  margin="normal"
                  value={alias}
                  onChange={this.handleChange('alias')}/>
                <Button className={classes.input} color="primary" onClick={this.updateAlias.bind(this)}>Update</Button>
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
        height: 100,
        elevation: 2
    },
    textPosition: {
        position: "absolute",
        marginTop: 20,
        marginLeft: 20
    },
    boxPosition: {
        position: "absolute",
        marginTop: 20,
        marginLeft: 200
    }
}
export default withStyles(styles)(MyTeam);
