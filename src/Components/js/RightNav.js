import React,{useContext} from 'react'
import "../css/RightNav.css"
import girl1image from "../../assets/Dummyimages/Girl1.jpg"
import girl4image from "../../assets/Dummyimages/Girl4.jpg"
import girl6image from "../../assets/Dummyimages/Girl6.jpg"
import profileimage from "../../assets/Dummyimages/profileimage.jpg"
import Avatar from "@material-ui/core/Avatar";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../Context"
function RightNav() {
  const Auth=useContext(AuthContext)
    const Navigate=useNavigate()
    return (
        <div className='rightnav'>
         
           <div  className='profile'>
            {/* <img onClick={()=>{Navigate('/profile/ah')}} src={Auth.userdp} ></img> */}
            <Avatar
        style={{ border: "1px solid gray", margin: (7,0,0,0) ,height:50 ,width:50 }}
        alt="GeeksforGeeks Pic 1"
        src={Auth.userdp}

      />
            <p onClick={()=>{Navigate(`/profile/${Auth.uid}`)}}>{Auth.username}</p>
           </div>

         <button type='button' onClick={()=>{Navigate(`/${Auth.uid}/chat`)}}>Chats</button> 

           <div className='notifications'>
              <p>Recent messages</p>
              <div className='messages'>
             <div className='rightnav__message'>
                 <img src={girl1image}></img>
                 <div className='message-info'>
                 <p className='sender-name'>tangoCharlie</p>
                 <p className='sender-message'>So whats you real name</p>
                 </div>
             </div>
             <div className='rightnav__message'>
                 <img src={girl4image}></img>
                 <div className='message-info'>
                 <p className='sender-name'>Cool dude 69</p>
                 <p className='sender-message'>i am gonna meet you</p>
                 </div>
             </div>
             <div className='rightnav__message'>
                 <img src={girl6image}></img>
                 <div className='message-info'>
                 <p className='sender-name'>wrathqueen</p>
                 <p className='sender-message'>See you later</p>
                 </div>
             </div>
              </div>
              
           </div>
        </div>
    )
}

export default RightNav
