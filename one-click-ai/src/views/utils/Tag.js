import React from 'react';
import Chip from '@material-ui/core/Chip';

function Title({ tags }) {
    return (
        <div className="flex justify-center" style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
            {
                tags.map(tag =>
                    <div className="tags"><Chip label={tag} style={{ fontSize: "16px" }} color="primary" /></div>
                )
            }
        </div>
    )
}

export default Title;
