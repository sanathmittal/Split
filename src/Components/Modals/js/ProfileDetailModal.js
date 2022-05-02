import React,{useState,useContext,useEffect} from "react";
import "../css/ProfileDetailModal.css"
import { CSSTransition } from "react-transition-group";
import { doc,  onSnapshot,updateDoc, arrayUnion, arrayRemove, addDoc, setDoc } from "firebase/firestore";
import {db} from "../../../Firebase"
import { AuthContext } from "../../../Context";
import Loading from "../../../Reusable/js/Loading"
import WhiteBackdrop from "../../../Reusable/js/WhiteBackDrop"

function ProfileDetailModal(props) {
const[connectionStatus,setConnectionStatus]=useState()
const [connections,setConnections]=useState([])
const [connectionRequests,setConectionRequests]=useState([])
const [buttonStyle,setbuttonStyle]=useState("")
const [buttonText,setbuttonText]=useState("")
const [loading,setLoading]=useState(false)
    const auth=useContext(AuthContext)

useEffect(()=>{
   let connectionsIds=[]
  
if(props.splitId){
  const unsub = onSnapshot(doc(db, "users",auth.uid,"Splits", props.splitId), (doc) => {
    // console.log("Current data: ", doc.data().connections);

    if(doc.data().connections){
      // setConnections(doc.data().connections)
      doc.data().connections.forEach(element => {
          connectionsIds.push(element.splitId)
          
      });
    }
  setConnections(connectionsIds)

  
 
});


}

},[props.splitId])

useEffect(()=>{

  let connectionRequestsIds=[]
if(props.viewSplitId){
 const opposite = onSnapshot(doc(db, "users",props.userId,"Splits", props.viewSplitId), (doc) => {
   // console.log("Current data: ", doc.data().connections);

   if(doc.data().connectionRequests){
     // setConnections(doc.data().connections)
     doc.data().connectionRequests.forEach(element => {
         connectionRequestsIds.push(element.splitId)
         
     });
   }
  
setConectionRequests(connectionRequestsIds)

 

});


}

},[props.viewSplitId])


useEffect(()=>{

// if(connections.length === 0){
//     return
// }



if(props.viewSplitId === props.splitId){
    setConnectionStatus("self")
   
   return;
}

if(connectionRequests.includes(props.splitId)){
  setConnectionStatus("requested")
  return
}
// console.log(props.viewSplitId)
 
    setConnectionStatus(connections.includes(props.viewSplitId))


},[props.viewSplitId,connections,connectionRequests])

// useEffect(()=>{
//   console.log(connectionRequests)
// },[connectionRequests])


useEffect(()=>{
if(connectionStatus === "self"){
    setbuttonStyle("profiledetailmodal-top-button-self")
    
}
if(connectionStatus === "requested"){
  setbuttonStyle("profiledetailmodal-top-button-requested")
  setbuttonText("Requested")
}
if(connectionStatus === true){
    setbuttonStyle("profiledetailmodal-top-button-connected")
    setbuttonText("Connected")
}
if(connectionStatus ===false){
    setbuttonStyle("profiledetailmodal-top-button-notconnected")
    setbuttonText("Connect")
}
// setConnectionStatus(true)

},[connectionStatus,props.viewSplitId])


const onConnectClick= async ()=>{
  setLoading(true)
    const washingtonRef = doc(db, "users",props.userId,"Splits", props.viewSplitId);

    
    // await updateDoc(washingtonRef, {
    //     connections: arrayUnion({
    //       avatar:props.avatar,
    //       name:props.name,
    //       bio:props.bio,
    //       id:props.viewSplitId
    //     })
    // });
    
    
    await updateDoc(washingtonRef, {
      connectionRequests: arrayUnion({
        avatar:props.selfUser.avatar,
        name:props.selfUser.name,
        bio:props.selfUser.bio,
        splitId:props.selfUser.id,
        userId:auth.uid
      })
  });
  
     setConnectionStatus("requested")
     setLoading(false)
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
        {loading && <Loading></Loading> }
        {loading && <WhiteBackdrop></WhiteBackdrop>}
        <div className="profiledetailmodal-top">
          <img src={props.avatar}></img>
          <p>
            Connections: <span>{props.connections}</span>
          </p>
          <button className={buttonStyle} type="button" onClick={(connectionStatus === false) ? onConnectClick : ()=>{}}>{buttonText}</button>
        </div>
        <div className="profiledetailmodal-bottomtext">
          <p className="profiledetailmodal-bottomtext-name">{props.name}</p>
          <p className="profiledetailmodal-bottomtext-bio">  {props.bio} </p>
              
        </div>
        <ul className="profiledetailmodal__choices">
                {props.Choices.map((choice)=><li key={choice}>{choice}</li>)}
        </ul>
      </div>
      
    </CSSTransition>
  );
}

export default ProfileDetailModal;
