import React from 'react';
import Paper from '@material-ui/core/Paper';

function Description({ desc }) {
    return (
        <Paper elevation={3} className="description">
            <p >{desc}</p>
        </Paper>
    )
}

export default Description;
