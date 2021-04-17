import React from 'react';

function Yt({ src, title }) {
  return (
    <div
      className="container yt"
      style={{ marginTop: '10px', marginBottom: '10px' }}
    >
      <iframe
        width="100%"
        height="100%"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Yt;
