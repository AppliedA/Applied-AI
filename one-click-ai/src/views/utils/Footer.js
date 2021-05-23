import React from 'react';

export default function Footer() {
  return (
    <div className="footer">
      <a
        href="https://github.com/AppliedA/Applied-AI"
        target="_blank"
        rel="noreferrer"
        className="footer-github flex justify-center items-center"
      >
        <img
          alt="github"
          style={{ width: '24px', marginRight: '5px' }}
          src="https://img.icons8.com/fluent/48/000000/github.png"
        />
        <span style={{ color: 'white' }}>github</span>
      </a>
      <a
        href="https://www.youtube.com/watch?v=cGqB2uhHcs8&list=PLdaWlSfDidCTVN303hA-2RGtthdIk1PxM"
        target="_blank"
        rel="noreferrer"
        className="footer-youtube flex justify-center items-center"
      >
        <img
          alt="youtube"
          style={{ width: '24px', marginRight: '5px' }}
          src="./images/youtube.png"
        />
        <span style={{ color: 'white' }}>YouTube</span>
      </a>
      <div className="footer-copyright flex">&#169; 2021</div>
    </div>
  );
}
