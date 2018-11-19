import React, { PureComponent } from 'react';
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles} from '@material-ui/core';
import {AccountCircle, BarChart, GroupAdd, Gavel, Notes, SupervisedUserCircle,
        SwapHoriz, People, Shuffle, ArrowUpward, PermIdentity, FolderShared} from '@material-ui/icons'


class AppMenu extends PureComponent {
    
    render() {
        const {classes, isCommissioner, username, setPage, leagues, alias} = this.props;

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
                                <ListItemIcon><FolderShared /></ListItemIcon>
                                <ListItemText primary={alias} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Commissioner Settings" />
                            </ListItem>
                            <ListItem button onClick={() => setPage("Manage Users")}>
                                <ListItemIcon><Gavel /></ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItem>
                            { <ListItem button onClick={() => setPage("Update Alias")}>
                                <ListItemIcon><People /></ListItemIcon>
                                <ListItemText primary="Update My Alias" />
                            </ListItem>}
                            <ListItem button onClick={() => setPage("Create Match")}>
                                <ListItemIcon><Shuffle /></ListItemIcon>
                                <ListItemText primary="Create Match" />
                            </ListItem>
                        </>
                    )}
                </List>
                )}
                <Divider />
                {username && !!leagues.length && (
                  <List>
                      <ListItem>
                          <ListItemText primary="League Options" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("My Team")}>
                          <ListItemIcon><Notes /></ListItemIcon>
                          <ListItemText primary="My Team" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Free Agents")}>
                          <ListItemIcon><GroupAdd /></ListItemIcon>
                          <ListItemText primary="Free Agents" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Trade Player")}>
                          <ListItemIcon><SwapHoriz /></ListItemIcon>
                          <ListItemText primary="Trade a Player" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Players Teams")}>
                          <ListItemIcon><People /></ListItemIcon>
                          <ListItemText primary="My Players' Teams" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("View Matchup")}>
                        <ListItemIcon><SupervisedUserCircle /></ListItemIcon>
                        <ListItemText primary="View Matchup" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Highest Ranking User")}>
                        <ListItemIcon><PermIdentity /></ListItemIcon>
                        <ListItemText primary="Highest Ranking User" />
                      </ListItem>
                      <ListItem button onClick={() => setPage("Top Scores By Week")}>
                        <ListItemIcon><ArrowUpward /></ListItemIcon>
                        <ListItemText primary="Top Scores By Week" />
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
