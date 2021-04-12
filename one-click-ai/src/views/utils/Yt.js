import React, { Component } from 'react'

function Yt({src,title}){
    return(
        <div className="container">
            <iframe width="560" height="315" 
            src={src} 
            title={title} frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
        </div>
    )
}

export default Yt;
