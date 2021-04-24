import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export class NavBar extends Component {
  constructor() {
    super();
    this.links = [
      {
        target: "/",
        name: "Home",
      },
      {
        target: "modal",
        name: "Projects",
      },
      {
        target: "https://github.com/AppliedA/Applied-AI",
        name: "Github",
      },
      {
        target: "https://www.youtube.com/",
        name: "YouTube",
      },
    ];
    this.project_list = [
      {
        target: "/nlp",
        name: "Sentiment Analysis",
      },
      {
        target: "/nlp-2",
        name: "Image Captioning",
      },
      {
        target: "/ar-1",
        name: "Real Time Object Plotation",
      },
      {
        target: "/ar-2",
        name: "Masking Object",
      },
      {
        target: "/disaster-prediction",
        name: "Disaster Prediction",
      },
      {
        target: "/product-defect-prediction",
        name: "Product Defect Predection",
      },
      {
        target: "/automatic-attendance",
        name: "Automatic Attendance",
      },
      {
        target: "/alexa",
        name: "Alexa",
      },
      {
        target: "/car",
        name: "Car",
      },
      {
        target: "/security",
        name: "Security",
      },
      {
        target: "/face-mask-detection",
        name: "Face Mask Detection",
      },
      {
        target: "/object-detection",
        name: "Object Detection",
      },
      {
        target: "/targeted-ads",
        name: "Targetted Ads",
      },
      {
        target: "/book-movie",
        name: "Movie Recommendation System",
      },
      {
        target: "/car-price",
        name: "Car Price",
      },
      {
        target: "/drug",
        name: "Drug Effectiveness",
      },
    ];
    this.state = {
      drawer: false,
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  drawer = () => (
    <div
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}
    >
      <List style={styles.fullList}>
        {this.links.map((page) => {
          let target = page.target;

          return page.name === "Home" ? (
            <Link to={`${target}`} className="link-sidebar" key={page.target}>
              <ListItem button>
                <ListItemIcon>{this.renderIcons(page.name)}</ListItemIcon>
                <ListItemText style={styles.text} primary={page.name} />
              </ListItem>
            </Link>
          ) : page.name === "Projects" ? (
            <div onClick={this.handleOpen} key={page.target}>
              <ListItem button>
                <ListItemIcon>{this.renderIcons(page.name)}</ListItemIcon>
                <ListItemText style={styles.text} primary={page.name} />
              </ListItem>
            </div>
          ) : (
            <a
              target="_blank"
              rel="noreferrer"
              href={`${target}`}
              className="link-sidebar"
              key={page.target}
            >
              <ListItem button>
                <ListItemIcon>{this.renderIcons(page.name)}</ListItemIcon>
                <ListItemText style={styles.text} primary={page.name} />
              </ListItem>
            </a>
          );
        })}
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
        return <AddIcon />;
    }
  };

  toggleDrawer = (open) => (event) => {
    if (
      event !== undefined &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ drawer: open });
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar style={styles.flex}>
            <Link to="/">
              <img
                style={{ width: "40px" }}
                src="./images/logo.png"
                alt="one click ai logo"
              />
            </Link>
            <Link to="/">
              <Typography variant="h6">
                <span style={{ color: "white" }}>Applied AI Lab</span>
              </Typography>
            </Link>
            <IconButton
              edge="start"
              onClick={this.toggleDrawer(true)}
              color="inherit"
              aria-label="menu"
            >
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
        {/* projects modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className="modal-cu"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className="paper-cu">
              <h2 id="transition-modal-title">All Projects List</h2>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                {this.project_list.map((project, index) => {
                  return (
                    <Link
                      to={project.target}
                      onClick={() => {
                        this.setState({ open: false });
                      }}
                    >
                      <Card
                        className="project_card"
                        variant="outlined"
                        key={index}
                      >
                        <CardContent>
                          <Typography
                            style={styles.title}
                            color="textPrimary"
                            gutterBottom
                          >
                            {project.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </Grid>
            </div>
          </Fade>
        </Modal>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e6e6e6",
  },
};

export default NavBar;
