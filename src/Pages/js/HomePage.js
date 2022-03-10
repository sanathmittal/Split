import React, { useState, useContext, useEffect } from "react";
import { Breakpoint, BreakpointProvider } from "react-socks";
import "../css/HomePage.css";
import RightNav from "../../Components/js/RightNav";
import LeftNav from "../../Components/js/LeftNav";
import EventCard from "../../Reusable/js/EventCard";
import eventimage from "../../assets/Dummyimages/eventimage.jpg";
import menu from "../../assets/websiteimages/menu.svg";
import avatar from "../../assets/Dummyimages/profileimage.jpg";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import Backdrop from "../../Reusable/js/Backdrop";
import EventFilterMenu from "../../Components/js/EventFilterMenu";
import filter from "../../assets/websiteimages/filter.svg";
import { AuthContext } from "../../Context";
import { Navigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
function HomePage() {
  const [showLeftnav, setShowleftnav] = useState(false);
  const [showEventFilter, setShowEventFilter] = useState(false);
  const [eventsJoined, setEventsJoined] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const auth = useContext(AuthContext);

  //    if(!auth.uid){
  //        return <Navigate to="/"></Navigate>
  //    }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(async () => {
    const events = [];

    const q = collection(db, "Events");

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data())

      //   console.log(doc.id, " => ", doc.data());
      const data = doc.data();
      events.push({ ...data, eventId: doc.id });
    });

    setAllEvents(events);
 
  }, [auth.uid]);




  useEffect(async () => {
    const eventsjoined = [];
if (auth.uid === "" || !auth.uid){
  return
}
    const splitsref = collection(db, "users", auth.uid, "Splits");

    const querySnapshot = await getDocs(splitsref);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      eventsjoined.push(doc.data().event);
    });
 
    setEventsJoined(eventsjoined);
  
    // setAllEvents(events)
    // console.log(allEvents)
  }, [auth.uid])

  return (
 
  
  
    <BreakpointProvider>
     
      <div className="home-page__page-container">
   
        {showLeftnav && (
          <Backdrop
            onClick={() => {
              setShowleftnav(false);
            }}
          ></Backdrop>
        )}
        <Breakpoint customQuery="(min-width: 1200px)">
          <LeftNav></LeftNav>
        </Breakpoint>
        <LeftNavMobile
          show={showLeftnav}
          className="homepage-leftnav"
        ></LeftNavMobile>
        <div className="homepage">
          {" "}
          <div className="homepage__topnav">
            <div className="homepage__topnav-menus">
              <img
                className="homepage__menu"
                src={menu}
                onClick={() => {
                  setShowleftnav(true);
                }}
              ></img>
              <img className="homepage__topnav-avatar" src={avatar}></img>
            </div>
            <div className="homepage__topnav-links">
              <p className="allevents">All Events</p>
              <div className="homepage__topnav-right">
                <p className="joined">Joined</p>
                <p className="wishist">wishlist</p>
                <p className="wishist">Coming soon</p>
              </div>
              <img
                onClick={() => {
                  setShowEventFilter((prev) => !prev);
                }}
                className="homepage__topnav-fltericon"
                src={filter}
              ></img>
            </div>
            {showEventFilter && <EventFilterMenu></EventFilterMenu>}
          </div>
          <div className="home-page__eventcards">
            <div className="eventcards-container">
              {allEvents.map((event) => (
                <EventCard
                  image={event.eventImage}
                  heading={event.name}
                  des={truncate(event.description, 150)}
               
                  status={  eventsJoined.some(item => item === event.eventId)}
                  key={event.eventId}
                  eventId={event.eventId}
                  participants={event.participantNo}
                  Choices={event.Choices}
                ></EventCard>
              ))}
              
            </div>
          </div>
        </div>
        <Breakpoint customQuery="(min-width: 1200px)">
          <RightNav className="homepage-rightnav"></RightNav>
        </Breakpoint>
        {/* { auth.user? null : <Navigate to="/" /> } */}
      </div>
    </BreakpointProvider>
  );
}

export default HomePage;
