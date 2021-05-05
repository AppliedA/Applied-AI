import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from 'react-icons/go';
import image from '../../images/self_driving.jpg';
export class AdsMol extends Component {
  constructor() {
    super();
    this.title1 = 'Smart Dustbin';
    this.title2 = 'Working Demo of Project';
    this.smalltitle1 = 'IOT';
    this.smalltitle2 = 'Smart Dustbin';
    this.githublink = '#';
    this.tags = ['proximity sensor','firebase','smarthome'];
    this.description =
      'Government has launched Swachh Bharat Abhiyan for cleanliness. But many times no follow up is taken about the dustbins. They are overflowed. So here is our project of Smart Dustbin, in which a siren will ring when dustbin will be filled more than 70%. Also SMS & Email will be sent to respective authorities when the dustbin is filled, so that they can take necessary actions.'
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
          <title>Smart Dustbin</title>
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
            src="https://www.youtube.com/embed/dgst0_gmol4"
            title="Smart Dustbin"
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
