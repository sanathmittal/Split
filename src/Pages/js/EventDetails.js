import React, { useState, useEffect } from "react";
import "../css/EventDetails.css";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import LeftNav from "../../Components/js/LeftNav";
import RightNav from "../../Components/js/RightNav";
import Backdrop from "../../Reusable/js/Backdrop";
import TopNav from "../../Components/js/TopNav";
import { Breakpoint, BreakpointProvider } from "react-socks";
import eventimage from "../../assets/Dummyimages/eventimage2.jpg";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase";
function EventDetails() {
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [event, setevent] = useState({
    // startedOn:[],
    // finishingOn: [],
    particpants: "",
    name: "",
    des: "",
    userGuidelines: "",
    image: "",
  });

  const Navigate = useNavigate();
  const location=useLocation()
  const [started, setstarted] = useState();

  const eventId = useParams();

  const onjoinClick = () => {
    Navigate(`/${eventId.eid}/createsplit/${event.name}` ,{state:{Choices:location.state.Choices}});
  };
  const onengageClick=()=>{
    Navigate(`/event/${eventId.eid}`)
}

  useEffect(async () => {
    //  console.log('sbsh',eventId.eid)
    const docRef = doc(db, "Events", eventId.eid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setevent({
        // startedOn:docSnap.data().startedDate,
        // finishingOn:docSnap.data().finishingDate,
        participants: docSnap.data().participantNo,
        name: docSnap.data().name,
        des: docSnap.data().description,
        userGuidelines: docSnap.data().userGuidelines,
        image: docSnap.data().eventImage,
      });
      setstarted(docSnap.data().startedDate);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, []);

  return (
    <BreakpointProvider>
      <div className="eventdetailspage__container">
        {showLeftNav && (
          <Backdrop
            onClick={() => {
              setShowLeftNav(false);
            }}
          ></Backdrop>
        )}
        <Breakpoint customQuery="(min-width: 1200px)">
          <LeftNav></LeftNav>
        </Breakpoint>
        <LeftNavMobile show={showLeftNav}></LeftNavMobile>
        <div className="eventdetailspage">
          <TopNav
            heading={event.name}
            onMenuClick={() => {
              setShowLeftNav(true);
            }}
          ></TopNav>
          <img src={event.image}></img>
          <div className="eventdetailspage__eventdetails">
            <p className="eventdetailspage__eventdetails-heading">
              {event.name}
            </p>
            <div className="eventdetailspage__eventdetails-stats">
              <p className="eventdetailspage__eventdetails-partcipants">
                Participants: <span>{event.participants}</span>
              </p>
              <p className="eventdetailspage__eventdetails-partcipants">
                Started on: <span>{started}</span>
              </p>
              <p className="eventdetailspage__eventdetails-partcipants">
                {/* Finishing on: <span>{event.finishingOn}</span> */}
              </p>
            </div>
            <div className="eventdetailspage__eventdetails-des">
              <p className="eventdetailspage__eventdetails-des__heading">
                Event Description:
              </p>
              <p className="eventdetailspage__eventdetails-des__text">
                {event.des}
              </p>
            </div>
            <div className="eventdetailspage__eventdetails-guidelines">
              <p className="eventdetailspage__eventdetails-guidelines__heading">
                User Guidelines
              </p>
              <p className="eventdetailspage__eventdetails-guidelines__text">
                {event.userGuidelines}
              </p>
            </div>
            
            {location.state.isJoined ?  <button id="engage-button" onClick={ onengageClick}> Engage</button> :     <button onClick={ onjoinClick}>Join</button>}
        
          </div>
        </div>

        <Breakpoint customQuery="(min-width: 1200px)">
          <RightNav></RightNav>
        </Breakpoint>
      </div>
    </BreakpointProvider>
  );
}

export default EventDetails;
