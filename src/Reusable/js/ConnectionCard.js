import React from 'react'
import "../css/ConnectionCard.css"
function ConnectionCard(props) {
    return (
        <div className='connection-card'>
            <div className='connection-card__info'>
            <img src={props.avatar}></img>
            <div className='connection-card__text'>
            <p className='connection-card__name'>{props.name}</p>
            <p className='connection-card__connectiondate'>Connected on: {props.connectionDate}</p>
            </div>
      
            </div>
            <button onClick={()=>{props.onRemoveClick(props.splitId)}}>Remove</button>
            
        </div>
    )
}

export default ConnectionCard
