import React from 'react'
import "../css/ProfileSettingsModal.css"
import {CSSTransition} from "react-transition-group"
import  {ModalContext} from "../../../Context"

function ProfileSettingsModal(props) {
    return (
    
        <CSSTransition  in={props.show} timeout={100} classNames="slide-in-left" mountOnEnter unmountOnExit >
        <div className='profilesettingsmodal'>
            
            <p>
               Logout
            </p>
            <p onClick={props.onEditProfileClick} >
                Edit Profile
            </p>
            <p onClick={props.onChangePasswordClick}>
                Change Password
            </p>
            <p onClick={props.onDeleteAccountClick}>
                Delete account
            </p>
        </div>
        </CSSTransition>

    )
}

export default ProfileSettingsModal
