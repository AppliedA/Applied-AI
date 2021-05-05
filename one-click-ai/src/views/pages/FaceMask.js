import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from 'react-icons/go';
import image from '../../images/mask_detection.jpeg';
export class AdsMol extends Component {
  constructor() {
    super();
    this.title1 = 'Face Mask Detection';
    this.title2 = 'Working Demo of Project';
    this.smalltitle1 = 'Computer Vision';
    this.smalltitle2 = 'Face Mask Detection';
    this.githublink = '#';
    this.tags = ['tensorflow','keras','opencv'];
    this.description =
      'With the Outbreak of CoronaVirus Mask On Protection On has become the motto of HumanKind. This project detects and alarms whether a person has worn the mask or not.'
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
          <title>Face Mask Detection</title>
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
            src="https://www.youtube.com/embed/HUN_1Xjs_nU"
            title="Face Mask Detection"
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
