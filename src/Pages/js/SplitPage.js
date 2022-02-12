import React, { useState, useContext, useEffect } from "react";
import LeftNav from "../../Components/js/LeftNav";
import RightNav from "../../Components/js/RightNav";
import "../css/SplitPage.css";
import girl1 from "../../assets/Dummyimages/Girl1.jpg";
import arrowleft from "../../assets/websiteimages/arrowleft.svg";
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
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { AuthContext } from "../../Context";

import Backdrop from "../../Reusable/js/Backdrop";
import SplitDeleteConfirmationModal from "../../Components/Modals/js/SplitDeleteConfirmationModal";
function SpltPage() {
  const [showBackdrop, setbackdrop] = useState(false);
  const [splitDeleteConfirmationModal, setSplitDeleteConfirmationModal] =
    useState(false);
    const [removeConfirmationModal, setRemoveConfirmationModal] =
    useState(false);
    const[deleteConnectionId,setDeleteConnectionId]=useState("")
  const [split, setSplit] = useState({
    name: "",
    bio: "",
    avatar: "",
    event: "",
    eventId: "",
    connections: [],
    connectionsNo: "",
  });
  const [connections, setConnections] = useState([
   
  ]);
  const auth = useContext(AuthContext);

  const splitId = useParams();
  const Navigate = useNavigate();
  useEffect(async () => {
    //  console.log('sbsh',eventId.eid)
    const docRef = doc(db, "users", auth.uid, "Splits", splitId.sid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSplit({
        name: docSnap.data().name,
        bio: docSnap.data().bio,
        avatar: docSnap.data().avatar,
        event: docSnap.data().eventName,
        eventId: docSnap.data().event,
        connections: docSnap.data().connections,
        connectionsNo: docSnap.data().connections.length,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, [splitId.sid, auth.uid,split.connections]);
 
  useEffect(async () => {
    if (split.eventId === "") {
  
    
      return;
    }
    let matches = [];
   
    split.connections.forEach(async (connection) => {
      const docRef = doc(
        db,
        "Events",
        split.eventId,
        "Participants",
        connection
      );
      const docSnap = await getDoc(docRef);
      matches.push({...docSnap.data(),splitId:docSnap.id});
    });
   
    setConnections(matches);
   

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }, [split.eventId]);

  const onYesClick = async () => {
    try {
      await deleteDoc(doc(db, "users", auth.uid, "Splits", splitId.sid));
      await deleteDoc(
        doc(db, "Events", split.eventId, "Participants", splitId.sid)
      );
      await updateDoc(doc(db, "users", auth.uid), {
        Events: arrayRemove(split.eventId),
      });
    } catch (error) {
      console.log("error in deleting", error);
    }

    console.log("deleted");
    Navigate(`/profile/${auth.uid}`);
    //    setbackdrop(false)
    //    setSplitDeleteConfirmationModal(false)
  };
const onRemoveClick=  (data)=>{
  setDeleteConnectionId(data)
  setbackdrop(true)
  setRemoveConfirmationModal(true)
}

const onRemoveYesClick= async ()=>{
  await updateDoc(doc(db, "users", auth.uid,"Splits",splitId.sid), {
    connections: arrayRemove(deleteConnectionId),
  });
  setbackdrop(false)
  setRemoveConfirmationModal(false)
}



  return (
    <div className="split__pagecontainer">
      <LeftNav></LeftNav>
      <div className="split-page">
        <div className="split-page__topnav">
          <img src={arrowleft}></img>
          <p>Dreamgirl 69</p>
        </div>
        {showBackdrop && (
          <Backdrop
            onClick={() => {
              setbackdrop(false);
              setSplitDeleteConfirmationModal(false);
              setRemoveConfirmationModal(false)
            }}
          ></Backdrop>
        )}

        <SplitDeleteConfirmationModal
          show={splitDeleteConfirmationModal}
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
        ></RemoveConfirmationModal>
        <div className="split-page__profilecarrier">
          <div className="split-page__profile">
            <div className="split-page__profile-info">
              <div className="split-page__profile-info-left">
                <img src={split.avatar}></img>
              </div>

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

            <div className="split-page__bio">
              <p className="split-page__name">{split.name}</p>
              <p className="split-page__biography">{split.bio}</p>
            </div>
          </div>
        </div>
        <img src={line}></img>
        <p>Connections</p>
        <div className="split-page__connection-cards">
          {/* <ConnectionCard
            avatar={girl2}
            name="Ruchit63"
            connectionDate="07/01/2022"
          ></ConnectionCard> */}

          {connections.map(connectio => (
            <ConnectionCard
              avatar={connectio.avatar}
              name={connectio.name}
              connectionDate="11/02/2022"
              key={connectio.user}
              splitId={connectio.splitId}
              onRemoveClick={onRemoveClick}
            ></ConnectionCard>
          ))}
          
        </div>
      </div>
      <RightNav></RightNav>
    </div>
  );
}

export default SpltPage;
