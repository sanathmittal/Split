import React from 'react'
import "../css/Image.css"
function Image(props) {
    return (
        <div className='image'>
            <img src={props.src}></img>
        </div>
    )
}

export default Image
