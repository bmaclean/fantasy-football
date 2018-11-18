import React, { PureComponent } from 'react';
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles} from '@material-ui/core';
import {AccountCircle, BarChart, Notes, Gavel, People, Shuffle} from '@material-ui/icons'


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
                    <ListItem>
                        <ListItemIcon><AccountCircle /></ListItemIcon>
                        <ListItemText primary={username} />
                    </ListItem>
                    {isCommissioner && (
                        <>
                            <ListItem>
                                <ListItemText primary="Commissioner Settings" />
                            </ListItem>
                            <ListItem button onClick={() => setPage("Manage Users")}>
                                <ListItemIcon><Gavel /></ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItem>
                            {/* <ListItem button onClick={() => setPage("Update Username")}>
                                <ListItemIcon><People /></ListItemIcon>
                                <ListItemText primary="Update Username" />
                            </ListItem> */}
                            <ListItem button onClick={() => setPage("Create Match")}>
                                <ListItemIcon><Shuffle /></ListItemIcon>
                                <ListItemText primary="Create Match" />
                            </ListItem>
                        </>
                    )}
                </List>
                )}
                <Divider />
                {username && (
                  <List>
                      <ListItem>
                          <ListItemText primary="League Settings" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Trade Player")}>
                          <ListItemIcon><BarChart /></ListItemIcon>
                          <ListItemText primary="Trade a Player" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Draft Player")}>
                          <ListItemIcon><BarChart /></ListItemIcon>
                          <ListItemText primary="Draft Player" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("My Team")}>
                          <ListItemIcon><Notes /></ListItemIcon>
                          <ListItemText primary="My Team" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Players Teams")}>
                          <ListItemIcon><People /></ListItemIcon>
                          <ListItemText primary="My Players' Teams" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Highest Ranking User")}>
                        <ListItemIcon><People /></ListItemIcon>
                        <ListItemText primary="Highest Ranking User" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Remove Players")}>
                          <ListItemIcon><People /></ListItemIcon>
                          <ListItemText primary="Remove Players from Roster" />
                      </ListItem>
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
