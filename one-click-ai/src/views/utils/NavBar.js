import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import TranslateIcon from '@material-ui/icons/Translate';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import AddIcon from '@material-ui/icons/Add';


export class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            drawer: false,
        }
    }

    drawer = () => (
        <div
            role="presentation"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
        >
            <List style={styles.fullList}>
                {
                    ["Home", "NLP", "AR"].map(page => {
                        let target = page.toLowerCase();
                        if (target === "home") target = "";

                        return (
                            <Link to={`/${target}`} key={page}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {this.renderIcons(page)}
                                    </ListItemIcon>
                                    <ListItemText style={styles.text} primary={page} />
                                </ListItem>
                            </Link>
                        );
                    })
                }
            </List>
        </div>
    );

    renderIcons = (name) => {
        switch (name) {
            case "Home":
                return <HomeIcon />;
            case "NLP":
                return <TranslateIcon />;
            case "AR":
                return <CameraEnhanceIcon />;
            default:
                return <AddIcon />
        }
    }

    toggleDrawer = (open) => (event) => {
        if (event !== undefined && (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
            return;
        }
        this.setState({ drawer: open });
    };

    render() {
        return (
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar style={styles.flex}>
                        <Typography variant="h6">
                            One Click AI
                            </Typography>
                        <IconButton edge="start" onClick={this.toggleDrawer(true)} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            anchor={"right"}
                            open={this.state.drawer}
                            onClose={this.toggleDrawer(false)}
                            onOpen={this.toggleDrawer(true)}
                        >
                            {this.drawer()}
                        </SwipeableDrawer>
                    </Toolbar>
                </AppBar>
            </div>
        );

    }
}

const styles = {
    text: {
        textAlign: "left",
        color: "black",
    },
    fullList: {
        width: "40vw",
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
    }
}

export default NavBar;