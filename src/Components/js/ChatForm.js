import React, { useState,useEffect } from 'react'
import "../css/ChatForm.css"
import mediaicon from "../../assets/websiteimages/mediaiconblack.svg";
import { ref, push, set  } from "firebase/database";
import { db ,database} from "../../Firebase";
import { v4 as uuidv4 } from "uuid";
function ChatForm(props) {
const [text,setText]=useState("")
const [result,setresult]=useState(null)
const htmlId = uuidv4();
// `{${props.currentSplitId},${props.currentConnectionId} }/`






useEffect(()=>{
   if(props.currentSplitId===""){
       return;
   }
   if(props.currentConnectionId===""){
       return;
   }
 
 setresult( props.currentSplitId.localeCompare(props.currentConnectionId))

},[props.currentConnectionId,props.currentSplitId])



    function  writeChat(e) {
        e.preventDefault()
        if (result === 1){
          
       const chatRoomId=props.currentSplitId + ','+ props.currentConnectionId 
       //`${props.currentSplitId},${props.currentConnectionId}`
            const postListRef = ref(database, 'Chatrooms/' + chatRoomId);
          const newPostRef = push(postListRef);
         try {
            set(newPostRef, {
                Sender:props.currentSplitId,
                 Reciver:props.currentConnectionId,
                 text : text,
                 messageId:newPostRef.key
    });
    console.log("working")
         } catch (error) {
             console.log("errorr",error)
         } 
     
        }
        if(result === -1){
        
            const postListRef = ref(database, 'Chatrooms/' +  `${props.currentConnectionId},${props.currentSplitId}` );
            const newPostRef = push(postListRef);
           set(newPostRef, {
               Sender:props.currentSplitId,
                Reciver:props.currentConnectionId,
                text : text,
                messageId:newPostRef.key

   });

        }
     
       
  setText("")
      }
      
  return (
    <form className="chatform-input" onSubmit={writeChat}>
    <img src={mediaicon}></img>
    <input placeholder="type here" value={text} onChange={(e)=>{  setText(e.target.value)}} ></input>
    {/* <button onClick={writeUserData}>send</button> */}
  </form>
  )
}

export default ChatForm