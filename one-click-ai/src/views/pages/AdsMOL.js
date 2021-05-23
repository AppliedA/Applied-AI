import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from 'react-icons/go';
import image from '../../images/targeted-ads-system.jpg';
export class AdsMol extends Component {
  constructor() {
    super();
    this.title1 = 'Targeted Ads Based on Gender/Age';
    this.title2 = 'Working Demo of Project';
    this.smalltitle1 = 'Computer Vision';
    this.smalltitle2 = 'Targeted Ads Based on Gender/Age';
    this.githublink = '#';
    this.tags = ['opencv', 'caffemodel', 'face detection'];
    this.description =
      'Ads play a crucial role in marketing of the product and revenue generation. Targeted ads are significantly effective in attracting customers. This project encompasses gender and age of a human and addresses specific ads related to the age group and gender.';
  }

  render() {
    let style = {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    };

    let iconsize = {
      height: '50px',
      width: '50px',
    };

    return (
      <div className="card-wrapper">
        <Helmet>
          <title>Targeted Ads Based on Gender/Age</title>
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
            <Description desc={this.description} tags={this.tags} />
            <img className="desc-img" src={image} alt={this.title} />
          </div>
          <br />
          <br />
          <br />
          <Title title={this.title2} />
          <SmallTitle title={this.smalltitle2} />
          <br />
          <Yt
            src="https://www.youtube.com/embed/VpF6ajh59fI"
            title="AdsMol Video"
          />
          <br />
          <a href={this.githublink}>
            <GoMarkGithub style={iconsize} /> Code on Github
          </a>
          <br />
        </div>
      </div>
    );
  }
}

export default AdsMol;
