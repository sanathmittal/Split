import React from 'react'
import "../css/ConnectionRequestCard.css"
function ConnectionRequestCard(props) {
  return (
    <div className='connectionrequest-card'>
    <div className='connectionrequest-card__info'>
    <img src={props.avatar}></img>
    <div className='connectionrequest-card__text'>
    <p className='connectionrequest-card__name'>{props.name}</p>
    {/* <p className='connectionrequest-card__connectiondate'>Connected on: {props.connectionDate}</p> */}
    </div>

    </div>
    <div className='connectionrequest-card-buttons'>
    <button  onClick={()=>{props.onAcceptClick(props.splitId,props.name,props.avatar,props.bio,props.userId)}} className='connectionrequest-card-accept' >Accept</button>
    <button onClick={()=>{props.onRejectClick(props.splitId,props.name,props.avatar,props.bio,props.userId)}} className='connectionrequest-card-reject'  >Reject</button>
    </div>
    
</div>
  )
}

export default ConnectionRequestCard