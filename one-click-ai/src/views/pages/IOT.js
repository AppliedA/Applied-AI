import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from 'react-icons/go';

export class AdsMol extends Component {
  constructor() {
    super();
    this.title1 = 'Targeted Ads Based on Gender/Age';
    this.title2 = 'Working Demo of Project';
    this.smalltitle1 = 'Deep learning';
    this.smalltitle2 = 'Targeted Ads Based on Gender/Age';
    this.githublink = '#';
    this.description =
      'Lorem ipsum dolor dsfsd sdf fd gf fg fg  sdf sds r trag tagr gtye sit amet, consectetur Lorem ipsum dolor dsfsd sdf fd gf fg fg  sdf sds r trag tagr gtye sit amet, consectetur  Lorem ipsum dolor dsfsd sdf fd gf fg fg  sdf sds r trag tagr gtye sit amet, consectetur  adipiscing elit. Phasellus ullamcorper tortor elementum massa posuere, id pretium est eleifend. Donec eu eros sed nibh lobortis facilisis. In mollis odio laoreet ipsum lacinia rutrum. Cras nulla massa, gravida sagittis pulvinar sed, faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
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
            <Description desc={this.description} />
            <img
              className="desc-img"
              src="https://picsum.photos/400/300"
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
            src="https://www.youtube.com/embed/VpF6ajh59fI"
            title="AdsMol Video"
          />
          <br />
          <a href={this.githublink}>
            <GoMarkGithub style={iconsize} /> Code on Github
          </a>
        </div>
      </div>
    );
  }
}

export default AdsMol;
