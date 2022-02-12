import React from 'react'
import {CSSTransition} from "react-transition-group"
import "../css/DeleteConfirmationModal.css"
function DeleteConfirmationModal(props) {

    return (
        <CSSTransition  in={props.show} timeout={100} classNames="slide-in-left" mountOnEnter unmountOnExit >
        <div className='deleteconfirmationmodal'>
            <p className='deleteconfirmationmodal__heading'>Are you sure you wnat to delete your account?</p>
            <p className='deleteconfirmationmodal__subheading'>all your progress and information will be lost.</p>
            <div  className='deleteconfirmationmodal__buttons'>
                <button className='deleteconfirmationmodal__yes'>yes</button>
                <button className='deleteconfirmationmodal__no'>No</button>
            </div>
        </div>
        </CSSTransition>
    )
}

export default DeleteConfirmationModal
