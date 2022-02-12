import React from 'react'
import "../css/SplitCard.css"


function SplitCard(props) {
    return (
        <div className='split-card' onClick={props.onClick}>
            <img src={props.avatar} className='split-avatar'></img>
            <div className="split-info">
                <p className='split-name'>{props.name}</p>
                <p className='split-event'>Event: <span>{props.event}</span></p>

            </div>
        </div>
    )
}

export default SplitCard
