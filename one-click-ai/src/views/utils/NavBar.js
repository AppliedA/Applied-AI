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
import AddIcon from '@material-ui/icons/Add';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';


export class NavBar extends Component {
    constructor() {
        super();
        this.links = [
            {
                target: "/",
                name: "Home"
            },
            {
                target: "modal",
                name: "Projects"
            },
            {
                target: "https://github.com/AppliedA/Applied-AI",
                name: "Github"
            },
            {
                target: "https://www.youtube.com/",
                name: "YouTube"
            },
        ]
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
                    this.links.map(page => {
                        let target = page.target;

                        return (

                            (page.name === "Home"
                                ?
                                <Link to={`${target}`} key={page.target}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            {this.renderIcons(page.name)}
                                        </ListItemIcon>
                                        <ListItemText style={styles.text} primary={page.name} />
                                    </ListItem>
                                </Link>
                                : <a target="_blank" rel="noreferrer" href={`${target}`} key={page.target}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            {this.renderIcons(page.name)}
                                        </ListItemIcon>
                                        <ListItemText style={styles.text} primary={page.name} />
                                    </ListItem>
                                </a>
                            )
                        );
                    })
                }
            </List>
        </div>
    );

    renderIcons = (name) => {
        name = name.toLowerCase();
        switch (name) {
            case "home":
                return <HomeIcon />;
            case "projects":
                return <LocalLibraryIcon />;
            case "github":
                return <GitHubIcon />;
            case "youtube":
                return <YouTubeIcon />;
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
            <div>
                <AppBar position="static">
                    <Toolbar style={styles.flex}>
                        <Link to="/" ><img style={{ width: "40px" }} src="./images/logo.png" alt="one click ai logo" /></Link>
                        <Link to="/">
                            <Typography variant="h6">
                                <span style={{ color: "white" }}>One Click AI</span>
                            </Typography>
                        </Link>
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
        width: "auto",
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
    }
}

export default NavBar;