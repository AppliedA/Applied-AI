import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { CardContent } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import { Helmet } from "react-helmet";

export class HomeCards extends Component {
    constructor() {
        super();
        this.domains = [
            {
                name: "NLP",
                class: "nlp-card",
                img: "./images/natural-language-processing.png",
                links: [{
                    name: "Natural Language Processing",
                    target: "nlp",
                }]
            },
            {
                name: "AR",
                class: "ar-card",
                img: "./images/augmented-reality.png",
                links: [{
                    name: "Augmented Reality",
                    target: "ar",
                }]
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
                ]
            },
            {
                name: "IOT",
                class: "iot-card",
                img: "./images/internet-of-things.png",
                links: [{
                    name: "Internet of Things",
                    target: "iot",
                }]
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
                        name: "Targetted Ads based on Gender/Age",
                        target: "targetted-ads",
                    },
                ]
            }
        ]
    }

    renderCards = (data) => {
        return (
            <Box className={data.class + " card"} boxShadow={4}>
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
                        {
                            data.links.map(link => {
                                return (
                                    <NavLink className="card-navlink" to={this.props.match.url + link.target}>
                                        <ListItem button disableGutters={true}>
                                            <span className="card-text" >{link.name}</span>
                                        </ListItem>
                                    </NavLink>
                                );
                            })
                        }
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    }

    render() {
        return (
            <div className="card-wrapper">
                <Helmet>
                    <title>Home Page - One Click AI</title>
                </Helmet>
                {
                    this.domains.map(data => this.renderCards(data))
                }
            </div>
        )
    }
}

export default HomeCards