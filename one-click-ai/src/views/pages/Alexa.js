import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from 'react-icons/go';
import image from '../../images/self-mad0alexa.jpg';
export class AdsMol extends Component {
  constructor() {
    super();
    this.title1 = 'Voice Controlled Appliances';
    this.title2 = 'Working Demo of Project';
    this.smalltitle1 = 'IOT';
    this.smalltitle2 = 'Voice Controlled Appliances:';
    this.githublink = '#';
    this.tags = ['firebase','raspberrypi','alexa'];
    this.description =
      'Voice enabled devices are essential in the time-bound daily activities. This is a project for a voice controlled system to control appliances with your voice. An Arduino is used for controlling the relay through which an appliance is switched on/off.'
    }

  render() {
    let style = {
      width: '100%',
      display: 'flex',
      'flex-wrap': 'wrap',
      'justify-content': 'center',
      'align-items': 'center',
    };

    let iconsize = {
      height: '50px',
      width: '50px',
    };

    return (
      <div className="card-wrapper">
        <Helmet>
          <title>Voice Controlled Appliances</title>
        </Helmet>
        <div
          style={{ width: '100%' }}
          className="flex flex-col justify-center items-center"
        >
          <Title title={this.title1} />
          <SmallTitle title={this.smalltitle1} />
          <br />
          <br />
          <div style={style}>
            <Description desc={this.description} tags = {this.tags} />
            <img
              className="desc-img"
              src={image}
              alt={this.title}
            />
          </div>
          <br />
          <br />
          <br />
          <Title title={this.title2} />
          <SmallTitle title={this.smalltitle2} />
          <br />
          <Yt
            src="https://www.youtube.com/embed/cGqB2uhHcs8"
            title="Alexa Video"
          />
          <br />
          <a href={this.githublink}>
            <GoMarkGithub style={iconsize} /> Code on Github
          </a>
          <br/>
        </div>
      </div>
    );
  }
}

export default AdsMol;
