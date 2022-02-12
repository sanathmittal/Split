import React from 'react'
import "../css/Message.css" 


function Message(props) {
    return (
        <div className='message'>
            <p>{props.children}</p>
        </div>
    )
}

export default Message
