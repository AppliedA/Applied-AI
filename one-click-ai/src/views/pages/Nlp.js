import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from '../utils/Title';
import Description from '../utils/Description';
import Tag from '../utils/Tag';
import Yt from '../utils/Yt';

export class Nlp extends Component {
  constructor() {
    super();
    this.title = 'Natural Language Processing';
    this.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper tortor elementum massa posuere, id pretium est eleifend. Donec eu eros sed nibh lobortis facilisis. In mollis odio laoreet ipsum lacinia rutrum. Cras nulla massa, gravida sagittis pulvinar sed, faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    this.tags = ['tag1', 'tag2', 'tag3'];
  }
  render() {
    return (
      <>
        <div className="card-wrapper">
          <Helmet>
            <title>Natural Language Processing - One Click AI</title>
          </Helmet>
          <div
            style={{ width: '100%' }}
            className="flex flex-col justify-center items-center"
          >
            <Title title={this.title} />
            <img
              className="desc-img"
              src="https://picsum.photos/400/300"
              alt="Natural Language Processing"
            />
            <Description desc={this.description} />
            <Tag tags={this.tags} />
            <Yt
              src="https://www.youtube.com/embed/tQ0yjYUFKAE"
              title="NLP Video"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Nlp;
