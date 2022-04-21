import React from 'react'
import "../css/ConnectionCard.css"
import { useNavigate, useParams } from "react-router-dom";
function ConnectionCard(props) {
const Navigate=useNavigate



    return (
        <div className='connection-card'>
            <div className='connection-card__info'>
            <img src={props.avatar}></img>
            <div className='connection-card__text'>
            <p className='connection-card__name'>{props.name}</p>
            {/* <p className='connection-card__connectiondate'>Connected on: {props.connectionDate}</p> */}
            </div>
      
            </div>
            <button onClick={()=>{props.onRemoveClick(props.splitId,props.avatar,props.name,props.bio,props.userId)}}>Remove</button>
            
        </div>
    )
}

export default ConnectionCard
