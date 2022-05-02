import React, { useState, useContext, useEffect } from "react";
import LeftNav from "../../Components/js/LeftNav";
import RightNav from "../../Components/js/RightNav";
import "../css/SplitPage.css";
import girl1 from "../../assets/Dummyimages/Girl1.jpg";
import arrowleft from "../../assets/websiteimages/arrowleft.svg";
import  { Breakpoint, BreakpointProvider } from 'react-socks';
import line from "../../assets/websiteimages/Line.svg";
import ConnectionCard from "../../Reusable/js/ConnectionCard";
import girl2 from "../../assets/Dummyimages/Girl2.jpg";
import { useNavigate, useParams } from "react-router-dom";
import RemoveConfirmationModal from "../../Components/Modals/js/RemoveConfirmationModal";
import {
  doc,
  getDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  increment
} from "firebase/firestore";
import { db } from "../../Firebase";
import { AuthContext } from "../../Context";

import Backdrop from "../../Reusable/js/Backdrop";
import SplitDeleteConfirmationModal from "../../Components/Modals/js/SplitDeleteConfirmationModal";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import TopNav from "../../Components/js/TopNav";
import Loading from "../../Reusable/js/Loading";
import ConnectionRequestCard from "../../Reusable/js/ConnectionRequestCard";
import WhiteBackDrop from "../../Reusable/js/WhiteBackDrop";
function SpltPage() {

const[isLoading1,setISLoading1]=useState(false) 
const [processLoading,setProcessLoading]=useState(false)
const [modalLoading,setModalLoading]=useState(false)
const [showConnections,setShowConnections]=useState(true)
 
  const [showBackdrop, setbackdrop] = useState(false);
  const[showLeftNav,setShowLeftNav]=useState(false)
  const [splitDeleteConfirmationModal, setSplitDeleteConfirmationModal] =
    useState(false);
    const [removeConfirmationModal, setRemoveConfirmationModal] =
    useState(false);
    const[deleteConnectionId,setDeleteConnectionId]=useState({
      id:"",
      avatar:"",
      name:"",
      bio:""
    })
  const [split, setSplit] = useState({
    name: "",
    bio: "",
    avatar: "",
    event: "",
    eventId: "",
    connections: [],
    connectionRequests:[],
    connectionsNo: "",
  });
  const [connectionIds, setConnectionIds] = useState([
   
  ]);
  const auth = useContext(AuthContext);

  const splitId = useParams();
  const Navigate = useNavigate();

const onMenuClick=()=>{
  setShowLeftNav(true)
  setbackdrop(true)
}

  useEffect(async () => {
     // console.log('sbsh')
     
// const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
//     console.log("Current data: ", doc.data());
// });
if(auth.uid === null){
  return
}

    setISLoading1(true)
    const docRef = doc(db, "users", auth.uid, "Splits", splitId.sid);
   // const docSnap = await getDoc(docRef);
   const unsub = onSnapshot(docRef, (docSnap) => {

    setSplit({
      name: docSnap.data().name,
      bio: docSnap.data().bio,
      avatar: docSnap.data().avatar,
      event: docSnap.data().eventName,
      eventId: docSnap.data().event,
      connections: docSnap.data().connections,
      connectionRequests:docSnap.data().connectionRequests,
      connectionsNo: docSnap.data().connections.length,
    });  
});
    setISLoading1(false)
  }, [splitId.sid, auth.uid]);
 
 useEffect(()=>{
   if(split.connections === []){
     return;
   }
  const Connections=[]
   split.connections.forEach((c)=>{
     Connections.push({splitId:c.splitId,userId:c.userId})
   })
   setConnectionIds(Connections)

 },[split.connections])

   


  const onYesClick = async () => {
    setModalLoading(true)
    try {
      await deleteDoc(doc(db, "users", auth.uid, "Splits", splitId.sid));
      await deleteDoc(
        doc(db, "Events", split.eventId, "Participants", splitId.sid)
      );
      await updateDoc(doc(db, "users", auth.uid), {
        Events: arrayRemove(split.eventId),
      });
   connectionIds.forEach(async (c)=>{
    const oppositeRef = doc(db, "users",c.userId , "Splits", c.splitId);
    await updateDoc(oppositeRef, {
        connections: arrayRemove({
          avatar:split.avatar,
          name:split.name,
          bio:split.bio,
          splitId:splitId.sid,
          userId:auth.uid
        })
    });
   })

   const ParticipantsRef = doc(db, "Events", split.eventId);
      
   // Atomically increment the population of the city by 50.
   await updateDoc(ParticipantsRef, {
      participantNo:increment(-1)
   });

    } catch (error) {
      console.log("error in deleting", error);
    }

    setModalLoading(false)
    Navigate(`/profile/${auth.uid}`);
    //    setbackdrop(false)
    //    setSplitDeleteConfirmationModal(false)
  };
const onRemoveClick=  (id,avatar,name,bio,uid)=>{
  setDeleteConnectionId({
    splitId:id,
    avatar:avatar,
    name:name,
    bio:bio,
    userId:uid
  })
  setbackdrop(true)
  setRemoveConfirmationModal(true)
}

const onRemoveYesClick= async ()=>{
  setModalLoading(true)
  await updateDoc(doc(db, "users", auth.uid,"Splits",splitId.sid), {
    connections: arrayRemove(deleteConnectionId),
  });
  await updateDoc(doc(db, "users", deleteConnectionId.userId,"Splits",deleteConnectionId.splitId), {
    connections: arrayRemove({
      splitId:splitId.sid,
    avatar:split.avatar,
    name:split.name,
    bio:split.bio,
    userId:auth.uid
    }),
  });
  setModalLoading(true)
  setbackdrop(false)

  setRemoveConfirmationModal(false)
}

const onAcceptClick=async (id,name,avatar,bio,uid)=>{
     
  setProcessLoading(true)

  const washingtonRef = doc(db, "users",auth.uid,"Splits", splitId.sid);

    
    await updateDoc(washingtonRef, {
        connections: arrayUnion({
          avatar:avatar,
          name:name,
          bio:bio,
          splitId:id,
          userId:uid,
        })
    });

    await updateDoc(washingtonRef, {
      connectionRequests: arrayRemove({
        avatar:avatar,
        name:name,
        bio:bio,
        splitId:id,
        userId:uid
      })
  });


  const oppositeRef = doc(db, "users",uid , "Splits", id);

    
  await updateDoc(oppositeRef, {
      connections: arrayUnion({
        avatar:split.avatar,
        name:split.name,
        bio:split.bio,
        splitId:splitId.sid,
        userId:auth.uid
      })
  });
  setProcessLoading(false)
}

const onRejectClick=async (id,name,avatar,bio,uid)=>{
  setProcessLoading(true)

  const washingtonRef = doc(db, "users",auth.uid,"Splits", splitId.sid);
  await updateDoc(washingtonRef, {
    connectionRequests: arrayRemove({
      avatar:avatar,
      name:name,
      bio:bio,
      splitId:id,
      userId:uid
    })
});
setProcessLoading(false)
}


// <ProfileDetailModal
// selfUser={split}
// show={showProfileDetail}
// name={viewSplit.name}
// avatar={viewSplit.avatar}
// connections={viewSplit.connections}
// bio={viewSplit.bio}
// viewSplitId={viewSplit.id}
// userId={viewSplit.userId}
// splitId={splitid}
// Choices={viewSplit.Choices}
// ></ProfileDetailModal>

  return (
    <BreakpointProvider>x
    <div className="split__pagecontainer">
        
    <Breakpoint customQuery="(min-width: 1200px)">
            <LeftNav ></LeftNav>
            </Breakpoint>
      <div className="split-page">
        {/* <div className="split-page__topnav">
          <img src={arrowleft}></img>
          <p>Dreamgirl 69</p>
        </div> */}
           
           <LeftNavMobile show={showLeftNav} className="homepage-leftnav"></LeftNavMobile> 
        {showBackdrop && (
          <Backdrop
            onClick={() => {
              setbackdrop(false);
              setSplitDeleteConfirmationModal(false);
              setRemoveConfirmationModal(false)
              setShowLeftNav(false)
            }}
          ></Backdrop>
        )}
        {processLoading && <WhiteBackDrop></WhiteBackDrop>  }
         {processLoading && <Loading></Loading>}
        <SplitDeleteConfirmationModal
          show={splitDeleteConfirmationModal}
          isLoading={modalLoading}
          onNoClick={() => {
            setSplitDeleteConfirmationModal(false);
            setbackdrop(false);
          }}
          onYesClick={onYesClick}
        ></SplitDeleteConfirmationModal>
         <RemoveConfirmationModal
          show={removeConfirmationModal}
          onNoClick={() => {
            setbackdrop(false)
            setRemoveConfirmationModal(false)
          }}
          onYesClick={onRemoveYesClick}
          isLoading={modalLoading}
        ></RemoveConfirmationModal>
        <div className="split-page__profilecarrier">
        <TopNav heading={`Split: ${split.name}`} onMenuClick={onMenuClick}></TopNav>
          <div className="split-page__profile">
            <div className="split-page__profile-info">
              
              <div className="split-page__profile-info-left">
                <img src={split.avatar}></img>
              </div>
              <div className="split-page__profile-adjust">
              <div className="split-page__profile-info-middle">
                <p className="split-page__profile-event">
                  Event: <span>{split.event}</span>
                </p>
                <button
                  onClick={() => {
                    setbackdrop(true);
                    setSplitDeleteConfirmationModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="split-page__profile-info-right">
                <p className="split-page__profile-connections">
                  Connections: <span>{split.connectionsNo}</span>
                </p>
              </div>
              </div>

            
            </div>

            <div className="split-page__bio">
              <p className="split-page__name">{split.name}</p>
              <p className="split-page__biography">{split.bio}</p>
            </div>
          </div>
        </div>
        <img src={line}></img>
        <div className="split-page__profile-bottom">
        <p onClick={()=>{setShowConnections(true)}} className={showConnections && "splitpage_currently" }>Connections</p>
        <p onClick={()=>{setShowConnections(false)}} className={!showConnections && "splitpage_currently" }>Requests</p>
        </div>
      
        <div className="split-page__connection-cards">
          {/* <ConnectionCard
            avatar={girl2}
            name="Ruchit63"
            connectionDate="07/01/2022"
          ></ConnectionCard> */}
             
          { showConnections &&  split.connections.map(connectio => (
            <ConnectionCard
              avatar={connectio.avatar}
              name={connectio.name}
              connectionDate="11/02/2022"
              bio={connectio.bio}
              key={connectio.splitId}
              splitId={connectio.splitId}
              userId={connectio.userId}
              onRemoveClick={onRemoveClick}
              
            ></ConnectionCard>
          ))}

{!showConnections &&  split.connectionRequests.map(connectio => (
            <ConnectionRequestCard
              avatar={connectio.avatar}
              name={connectio.name}
            //  connectionDate="11/02/2022"
              bio={connectio.bio}
              key={connectio.splitId}
              splitId={connectio.splitId}
              userId={connectio.userId}
              onAcceptClick={onAcceptClick}
              onRejectClick={onRejectClick}
            ></ConnectionRequestCard>
          ))}
              {isLoading1 && <Loading></Loading> }
        </div>
      </div>
    
      <Breakpoint customQuery="(min-width: 1200px)">
      <RightNav></RightNav>
            </Breakpoint>
    </div>
    </BreakpointProvider>
  );
}

export default SpltPage;
