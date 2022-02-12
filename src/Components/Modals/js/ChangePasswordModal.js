import React from 'react'
import {CSSTransition} from "react-transition-group"
import "../css/ChangePasswordModal.css"
import profileimage from "../../../assets/Dummyimages/profileimage.jpg"
function ChangePasswordModal(props) {
    return (
        <CSSTransition  in={props.show} timeout={100} classNames="slide-in-left" mountOnEnter unmountOnExit >
        <div className='changepasswordmodal'>
        <div className='changepasswordmodal__header'>
            <img src={profileimage}></img>
            <p>Sanath Mittal</p>
        </div>
        <form className='changepasswordmodal__form'>
         <div className='changepasswordmodal__form-entry'>
      <p>Old Password</p>
      <input type="text"></input>
         </div>
         <div className='changepasswordmodal__form-entry'>
      <p>New Password</p>
      <input type="text"></input>
         </div>
         <div className='changepasswordmodal__form-entry'>
      <p>Confirm New Password</p>
      <input type="text"></input>
         </div>
         <button>Change Password</button>
        </form>
        </div>
        </CSSTransition>
    )
}

export default ChangePasswordModal
