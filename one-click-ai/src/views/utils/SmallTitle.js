import React from 'react'

function SmallTitle({ title }) {
    let style = {
        "color" : "blue",
        "font-size":"30px"

    };
    return (
        <p style = {style} className="title">{title}</p>
    )
}

export default SmallTitle;
