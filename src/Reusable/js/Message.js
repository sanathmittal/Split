import React,{useEffect,useState} from 'react'
import "../css/Message.css" 
import threeDot from "../../assets/websiteimages/threeDot.svg"
import { ref, push, set,remove  } from "firebase/database";
import { db ,database} from "../../Firebase";

function Message(props) {
const [messageClass,setMessageClass]=useState("")
const [deleteClass,setdeleteClass]=useState("display-none-message")
const [showDelete,setShowDelete]=useState(false)
    useEffect(()=>{
        if(props.senderId === props.currentSplitId){

   setMessageClass("message-sent")
        }
        else{
            setMessageClass("message-recived")
        }

         

        // console.log(messageClass)
    },[props.messageId])
 
useEffect(()=>{
   // console.log(showDelete)
   if(props.senderId !== props.currentSplitId){
       return;

   }
    if(showDelete === true){
        setdeleteClass("display-block")
     }
     else{
              setdeleteClass("display-none-message")
     }
},[showDelete,props.messageId])
// const onDeleteClick=()=>{

//     remove()
// }

    return (
        <div  className={messageClass}>
        <div className='message' >
          
            <p onClick={()=>{
                 if(props.senderId !== props.currentSplitId){
                   
                    return;
                }
                setShowDelete(prev=>!prev)}}  >{props.children}  </p>
             <div onClick={()=>{props.onDeleteMessage(props.messageId)}}  className={`message-delete ${deleteClass}`}>Delete Message</div>
            {/* <img src={threeDot} className='message-options'></img> */}
        </div>
        </div>
    )
}
//onClick={props.DeleteMessage(props.messageId)}
export default Message
