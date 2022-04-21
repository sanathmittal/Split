import React from 'react'
import "../css/SplitDeleteConfirmationModal.css"
import {CSSTransition} from "react-transition-group"
import Loading from '../../../Reusable/js/Loading'
import WhiteBackDrop from '../../../Reusable/js/WhiteBackDrop'
function RemoveConfirmationModal(props) {
  return (
    <CSSTransition  in={props.show} timeout={100} classNames="slide-in-left" mountOnEnter unmountOnExit >
    <div className='splitdeleteconfirmationmodal'>
      {props.isLoading && <WhiteBackDrop></WhiteBackDrop>}
      {props.isLoading && <Loading></Loading>}
        <p className='splitdeleteconfirmationmodal__heading'>Are you sure you want to remove this connection?</p>
        <p className='splitdeleteconfirmationmodal__subheading'>you will be no longer be able to chat with this split and your progress will be lost.</p>
        <div  className='splitdeleteconfirmationmodal__buttons'>
            <button className='splitdeleteconfirmationmodal__yes' onClick={props.onYesClick}>yes</button>
            <button className='splitdeleteconfirmationmodal__no' onClick={props.onNoClick}>No</button>
        </div>
    </div>
    </CSSTransition>
  )
}

export default RemoveConfirmationModal