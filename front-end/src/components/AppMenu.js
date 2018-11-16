import React, { PureComponent } from 'react';
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles} from '@material-ui/core';
import {AccountCircle, BarChart, Notes, Gavel, People} from '@material-ui/icons'


class AppMenu extends PureComponent {

    handlePageSelect = () => {

    }

    render() {
        const {classes, isCommissioner, username, setPage} = this.props;

        return (
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                anchor="left">
                {username && (
                <List>
                    <ListItem button>
                        <ListItemIcon><AccountCircle /></ListItemIcon>
                        <ListItemText primary={username} />
                    </ListItem>
                    {isCommissioner && (
                        <ListItem button>
                            <ListItemIcon><Gavel /></ListItemIcon>
                            <ListItemText primary="Commissioner Settings" />
                        </ListItem>
                    )}
                </List>
                )}
                <Divider />
                {username && (
                  <List>
                      <ListItem button>
                          <ListItemIcon><BarChart /></ListItemIcon>
                          <ListItemText primary="Trade a Players" />
                      </ListItem>
                      <ListItem button>
                          <ListItemIcon><BarChart /></ListItemIcon>
                          <ListItemText primary="Draft Player" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("My Team")}>
                          <ListItemIcon><Notes /></ListItemIcon>
                          <ListItemText primary="My Team" />
                      </ListItem>
                      <ListItem button>
                          <ListItemIcon><People /></ListItemIcon>
                          <ListItemText primary="My Players' Teams" />
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon><People /></ListItemIcon>
                        <ListItemText primary="Highest Ranking User" />
                      </ListItem>
                  {isCommissioner && (
                    <div>
                      <ListItem button>
                          <ListItemIcon><People /></ListItemIcon>
                          <ListItemText primary="Remove Players" />
                      </ListItem>
                      <ListItem button>
                          <ListItemIcon><People /></ListItemIcon>
                          <ListItemText primary="Update Username" />
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon><People /></ListItemIcon>
                        <ListItemText primary="Update Username" />
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon><People /></ListItemIcon>
                        <ListItemText primary="Create New Match" />
                      </ListItem>
                    </div>
                  )}
                </List>
                )}

            </Drawer>
        )
    }
}

const styles = {
    drawer: {
        display: 'flex',
        width: 250,
    },
    drawerPaper: {
        width: 250
    }
}

export default withStyles(styles)(AppMenu);
