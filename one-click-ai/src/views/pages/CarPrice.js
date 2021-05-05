import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from 'react-icons/go';
import image from '../../images/car_price.png';
export class AdsMol extends Component {
  constructor() {
    super();
    this.title1 = 'Car Price Prediction';
    this.title2 = 'Working Demo of Project';
    this.smalltitle1 = 'Machine Learning';
    this.smalltitle2 = 'Car Price Prediction';
    this.githublink = '#';
    this.tags = ['pandas','numpy','sklearn'];
    this.description =
      'Many People prefer used cars over the new ones but fail to estimate the perfect price of the car and end up paying hefty sums for a poor model. This project identifies various features of the car and estimates the perfect price of the car and saves money.'
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
          <title>Car Price Prediction</title>
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
            src="https://www.youtube.com/embed/s3SZE3M33UI" 
            title="Car Price Prediction"
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
