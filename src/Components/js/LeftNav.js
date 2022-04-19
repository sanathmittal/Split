import React from 'react'
import "../css/LeftNav.css"
import contactus from "../../assets/websiteimages/contactus.svg"
import help from "../../assets/websiteimages/help.svg"
import resources from "../../assets/websiteimages/resources.svg"
import aboutus from "../../assets/websiteimages/aboutus.svg"
import {auth} from "../../Firebase"
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function LeftNav() {
    
const Navigate=useNavigate()
const onLogoutClick=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        return;
      });
     
      window.localStorage.removeItem("SplitIsAuth")
      window.localStorage.removeItem("currentChatConnectionId")
      window.localStorage.removeItem("currentChatSplitId")
      Navigate('/')
}

    return (
        <div className='leftnav'>
            <p className='leftnav-heading'>Split</p>
            <button type='button' className='leftnav-button' onClick={(e)=>{ Navigate("/home")}} >Join a event</button>
            <div className='options-container'>
            <div className='leftnav-options'>
            <div className='leftnav-option'>
                <img src={contactus} />
                <p className='option-des' onClick={()=>{Navigate("/contactus")}} >Contact Us</p>
            </div>
            <div className='leftnav-option'>
                <img src={aboutus} />
                <p className='option-des'>About Us</p>
            </div>
            <div  className='leftnav-option'>
                <img src={resources} />
                <p id="resources" className='option-des'>Resources</p>
            </div>
            <div id="help" className='leftnav-option'>
                <img src={help} />
                <p className='option-des'>Help</p>
            </div>
            <div id="help" className='leftnav-option'>
                <img src={help} />
                <p onClick={onLogoutClick} className='option-des'>Logout</p>
            </div>
            </div>
            </div>
        </div>
    )
}

export default LeftNav
