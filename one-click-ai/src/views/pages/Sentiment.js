import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from 'react-icons/go';
import image from '../../images/sentiment_analysis.jpg';
export class AdsMol extends Component {
  constructor() {
    super();
    this.title1 = 'Sentiment Analysis';
    this.title2 = 'Working Demo of Project';
    this.smalltitle1 = 'NLP';
    this.smalltitle2 = 'Sentiment Analysis';
    this.githublink = '#';
    this.tags = ['nltk','bert','tensorflow'];
    this.description =
      'Sentiment Analysis is a process of extracting opinions that have different polarities. By polarities, we mean positive, negative or neutral. With the help of sentiment analysis, you can find out the nature of opinion that is reflected in documents, websites, social media feed, etc. '
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
          <title>Sentiment Analysis</title>
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
            title="Sentiment Analysis"
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
