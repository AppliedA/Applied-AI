import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { CardContent } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import { Helmet } from "react-helmet";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export class HomeCards extends Component {
  constructor() {
    super();
    this.domains = [
      {
        name: "Natural Language Processing",
        class: "nlp-card",
        img: "./images/natural-language-processing.png",
        links: [
          {
            name: "Sentiment Analysis",
            target: "nlp",
          },
          {
            name: "Image Captioning",
            target: "nlp-2",
          },
        ],
      },
      {
        name: "Augmented Reality",
        class: "ar-card",
        img: "./images/augmented-reality.png",
        links: [
          {
            name: "Realtime 2D/3D Object Plotting",
            target: "ar-1",
          },
          {
            name: "Masking image/video on real world objects",
            target: "ar-2",
          },
        ],
      },
      {
        name: "Deep Learning",
        class: "dl-card",
        img: "./images/deep_learning.png",
        links: [
          {
            name: "Disaster Prediction",
            target: "disaster-prediction",
          },
          {
            name: "Product Defect Detection",
            target: "product-defect-prediction",
          },
          {
            name: "Automatic Attendance using Facial Recognition",
            target: "automatic-attendance",
          },
        ],
      },
      {
        name: "Internet of Things",
        class: "iot-card",
        img: "./images/internet-of-things.png",
        links: [
          {
            name: "Control home appliances using Alexa",
            target: "alexa",
          },
          {
            name: "Self Driving Car",
            target: "car",
          },
          {
            name: "Smart Dustbin",
            target: "security",
          },
        ],
      },
      {
        name: "Computer Vision",
        target: "computer-vision",
        class: "cv-card",
        img: "./images/computer_vision.png",
        links: [
          {
            name: "Face Mask Detection",
            target: "face-mask-detection",
          },
          {
            name: "Object Detection",
            target: "object-detection",
          },
          {
            name: "Targeted Ads based on Gender/Age",
            target: "targeted-ads",
          },
        ],
      },
      {
        name: "Machine Learning",
        target: "machine-learning",
        class: "ml-card",
        img: "./images/machine_learning.png",
        links: [
          {
            name: "Book/Movie Recommendation System",
            target: "book-movie",
          },
          {
            name: "Car Price Prediction",
            target: "car-price",
          },
          {
            name: "Drug Effectiveness on Humans",
            target: "drug",
          },
        ],
      },
    ];
  }

  renderCards = (data, index) => {
    return (
      <Box className={data.class + " card"} boxShadow={4} key={index}>
        <CardContent className="flex flex-col justify-center items-center">
          <img className="card-img" src={data.img} alt={data.name} />
        </CardContent>
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <span className="card-text">{data.name}</span>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col">
            {data.links.map((link, index) => {
              return (
                <NavLink
                  className="card-navlink"
                  to={this.props.match.url + link.target}
                  key={index}
                >
                  <ListItem button disableGutters={true}>
                    <span className="card-text">{link.name}</span>
                  </ListItem>
                </NavLink>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Applied AI Lab - One Click AI</title>
        </Helmet>
        <div className="bg-video-wrapper">
          <video loop muted className="bg-video" autoPlay>
            <source src="./videos/video.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
          </video>
          <a href="#about-section" className="scroll-down">
            <ArrowDownwardIcon />
          </a>
        </div>
        <div className="hero-section-wrapper" id="about-section">
          <h1 className="hero-header">Applied AI Lab</h1>
          <div className="flex items-start hero-desc-wrapper">
            <span className="hero-desc">
              Applied AI Lab is the junction where all subsection of Artificial Intelligence Intersects....
              <br />
                We have build several application oriented AI projects. Our Scope of projects encompasses a broad range of subsections of Artificial Intelligence from Computer Vision followed by IOT, AR, Deep Learning, Natural Language Processing and Machine Learning.
              <br />
                One - Click AI is an initiative from Applied AI Lab where one can actually run all the developed projects of AI within clicks over the web.
            </span>
            <div className="flex items-center justify-center" style={{ flexGrow: "1" }}>
              <img className="lottie-gif" src="./images/lottie.gif" alt="lottie animation" />
            </div>
          </div>
        </div>
        <h1 className="hero-header">Our Projects</h1>
        <div className="card-wrapper" id="project-section">
          {this.domains.map((data, index) => this.renderCards(data, index))}
        </div>
      </>
    );
  }
}

export default HomeCards;
