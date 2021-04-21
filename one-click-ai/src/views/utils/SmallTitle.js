import React from 'react';

function SmallTitle({ title }) {
  let style = {
    color: 'blue',
    fontSize: '30px',
  };
  return (
    <p style={style} className="title">
      {title}
    </p>
  );
}

export default SmallTitle;
