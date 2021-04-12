import React, { Component } from 'react'

function Title({tags}){
    return(
        <div className="container">
        {
        tags.map(tag => 
            <p key="tag.id">{tag}</p>
        )
        }
        </div>
    )
}

export default Title;
