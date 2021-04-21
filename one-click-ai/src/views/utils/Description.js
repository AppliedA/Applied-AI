import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tag from './Tag';
function Description({ desc }) {
  const [tag, setTag] = useState(['tag1', 'tag2', 'tag3']);
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
