import React, { useEffect, useState } from 'react'
import "../css/ChatCard.css"


function ChatCard(props) {
    const[selected,setSelected]=useState(false)
    useEffect(()=>{
        if(props.id=== props.currentConnectionid){
            setSelected(true)
        }
        else{
            setSelected(false)
        }
       
    },[props.currentConnectionid])
  return (
    <div className={selected ? "chat-card selected" :"chat-card unselected" } onClick={props.onClick}>
    <img src={props.avatar} className='chatcard-avatar'></img>
    <div className="chatcard-info">
        <p className='chatcard-name'>{props.name}</p>
 

    </div>
</div>
  )
}

export default ChatCard