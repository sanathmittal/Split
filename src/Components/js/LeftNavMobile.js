import React from 'react'
import "../css/LeftNav.css"
import contactus from "../../assets/websiteimages/contactus.svg"
import help from "../../assets/websiteimages/help.svg"
import resources from "../../assets/websiteimages/resources.svg"
import aboutus from "../../assets/websiteimages/aboutus.svg"
import logout from "../../assets/websiteimages/logout.svg"
import {CSSTransition} from "react-transition-group"
import { useNavigate } from "react-router-dom";
import {auth} from "../../Firebase"
import { signOut } from "firebase/auth";
function LeftNavMobile(props) {

const navigate=useNavigate()
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
      window.localStorage.removeItem("splitUserEvents")
      navigate('/')
}
    return (
        <CSSTransition  in={props.show} timeout={100} classNames="slide-in-left" mountOnEnter unmountOnExit >
        <div className='leftnavmobile'>
            <p className='leftnav-heading'>Split</p>
            <button className='leftnav-button' onClick={()=>{navigate("/home")}} >Join a event</button>
            <div className='options-container'>
            <div className='leftnav-options'>
            <div className='leftnav-option'>
                <img src={contactus} />
                <p className='option-des'  onClick={()=>{navigate("/contactus")}}>Contact Us</p>
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
                <img id="logout" src={logout} />
                <p className='option-des' onClick={onLogoutClick}>Logout</p>
            </div>
            </div>
            </div>
        </div>
        </CSSTransition>
    )
}

export default LeftNavMobile