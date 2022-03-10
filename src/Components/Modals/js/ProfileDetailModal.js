import React,{useState,useContext,useEffect} from "react";
import "../css/ProfileDetailModal.css"
import { CSSTransition } from "react-transition-group";
import { doc,  onSnapshot,updateDoc, arrayUnion, arrayRemove, addDoc, setDoc } from "firebase/firestore";
import {db} from "../../../Firebase"
import { AuthContext } from "../../../Context";

function ProfileDetailModal(props) {
const[connectionStatus,setConnectionStatus]=useState()
const [connections,setConnections]=useState([])
const [buttonStyle,setbuttonStyle]=useState("")
    const auth=useContext(AuthContext)

useEffect(()=>{
   let connectionsIds=[]
if(props.splitId){
  const unsub = onSnapshot(doc(db, "users",auth.uid,"Splits", props.splitId), (doc) => {
    // console.log("Current data: ", doc.data().connections);

    if(doc.data().connections){
      // setConnections(doc.data().connections)
      doc.data().connections.forEach(element => {
          connectionsIds.push(element.id)
      });
    }
  setConnections(connectionsIds)

 
});
}

},[props.splitId])


useEffect(()=>{

// if(connections.length === 0){
//     return
// }


if(props.viewSplitId === props.splitId){
    setConnectionStatus("self")
   
   return;
}

// console.log(props.viewSplitId)
else{
 
    setConnectionStatus(connections.includes(props.viewSplitId))
}




// const check =connections.some(item => props.viewSplitId === item);
// if(connections.includes(props.viewSplitId)){
//     // setConnectionStatus("connected")
//     console.log(connections.includes(props.viewSplitId))
// }
// if(!connections.includes(props.viewSplitId)){
//     setConnectionStatus("notconnected")
// }
// console.log(connectionStatus)


},[props.viewSplitId,connections])

useEffect(()=>{
if(connectionStatus === "self"){
    setbuttonStyle("profiledetailmodal-top-button-self")
}
if(connectionStatus === true){
    setbuttonStyle("profiledetailmodal-top-button-connected")
}
if(connectionStatus ===false){
    setbuttonStyle("profiledetailmodal-top-button-notconnected")
}
// setConnectionStatus(true)

},[connectionStatus,props.viewSplitId])


const onConnectClick= async ()=>{
    const washingtonRef = doc(db, "users",auth.uid,"Splits", props.splitId);

    
    await updateDoc(washingtonRef, {
        connections: arrayUnion({
          avatar:props.avatar,
          name:props.name,
          bio:props.bio,
          id:props.viewSplitId
        })
    });
    // await setDoc(doc(db,"users",auth.uid,"Splits",props.splitId,"Connections",props.viewSplitId),{
    //   avatar:props.avatar,
    //   name:props.name,
    //   bio:props.bio,
    //  name:"shsshsj",
    //   id:props.viewSplitId
    // })
    setConnectionStatus(true)
}

  return (
    <CSSTransition
      in={props.show}
      timeout={100}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
    
      <div className="profiledetailmodal">
        <div className="profiledetailmodal-top">
          <img src={props.avatar}></img>
          <p>
            Connections: <span>{props.connections}</span>
          </p>
          <button className={buttonStyle} type="button" onClick={connectionStatus?()=>{}:onConnectClick}>{connectionStatus ?"Connected" :"Connect"}</button>
        </div>
        <div className="profiledetailmodal-bottomtext">
          <p className="profiledetailmodal-bottomtext-name">{props.name}</p>
          <p className="profiledetailmodal-bottomtext-bio">  {props.bio} </p>
              
        </div>
      </div>
      
    </CSSTransition>
  );
}

export default ProfileDetailModal;
