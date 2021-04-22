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
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import CellWifiIcon from '@material-ui/icons/CellWifi';
import ContactsIcon from '@material-ui/icons/Contacts';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';


export class NavBar extends Component {
    constructor() {
        super();
        this.links = [
            {
                target: "/",
                name: "Home"
            },
            {
                target: "/nlp",
                name: "NLP"
            }
            ,
            {
                target: "/ar",
                name: "Augmented Reality"
            }
            ,
            {
                target: "/disaster-prediction",
                name: "Disaster Prediction"
            }
            ,
            {
                target: "/face-mask-detection",
                name: "Face Mask Detection"
            }
            ,
            {
                target: "/iot",
                name: "Internet of Things"
            }
            ,
            {
                target: "/automatic-attendance",
                name: "Automatic Attendance"
            }
            ,
            {
                target: "/object-detection",
                name: "Object Detection"
            }
            ,
            {
                target: "/product-defect-prediction",
                name: "Product Defect Detection"
            }
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
                            <Link to={`${target}`} key={page.target}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {this.renderIcons(page.target)}
                                    </ListItemIcon>
                                    <ListItemText style={styles.text} primary={page.name} />
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
            case "/":
                return <HomeIcon />;
            case "/nlp":
                return <TranslateIcon />;
            case "/ar":
                return <CameraEnhanceIcon />;
            case "/disaster-prediction":
                return <AddLocationIcon />;
            case "/product-defect-prediction":
                return <CancelPresentationIcon />;
            case "/automatic-attendance":
                return <ContactsIcon />;
            case "/iot":
                return <CellWifiIcon />;
            case "/face-mask-detection":
                return <CameraFrontIcon />;
            case "/targetted-ads":
                return <ControlCameraIcon />;
            case "/object-detection":
                return <FilterTiltShiftIcon />;
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
                        <img style={{ width: "40px" }} src="./images/logo.png" alt="one click ai logo" />
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
        width: "auto",
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
    }
}

export default NavBar;