import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tag from './Tag';
function Description({ desc , tags}) {
  const [tag, setTag] = useState(tags);
  let style = {
    marginRight: '0px',
  };
  return (
    <Paper style={style} elevation={1} className="description">
      <p>{desc}</p>
      <Tag tags={tag} />
    </Paper>
  );
}

export default Description;
