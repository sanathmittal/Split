import React, { useState } from "react";
import RightNav from "../../Components/js/RightNav";
import LeftNav from "../../Components/js/LeftNav";
import TopNav from "../../Components/js/TopNav";
import Backdrop from "../../Reusable/js/Backdrop";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import { Breakpoint, BreakpointProvider } from "react-socks";
import "../css/ChatPage.css"
import Image from "../../Reusable/js/Image";
import Message from "../../Reusable/js/Message";
import eventimage from "../../assets/Dummyimages/eventimage2.jpg";
function ChatPage() {
    const [showLeftNav, setShowLeftNav] = useState(false);
    return (
        <BreakpointProvider>
        <div className='chatpage__container'>
        {showLeftNav && <Backdrop onClick={()=>{setShowLeftNav(false)}}></Backdrop>}
     <Breakpoint customQuery="(min-width: 1200px)">
            <LeftNav ></LeftNav>
            </Breakpoint>
            <LeftNavMobile show={showLeftNav} ></LeftNavMobile> 
            <div className='chatpage'>
              <TopNav heading={"Dreamgirl69"} onMenuClick={()=>{setShowLeftNav(true)}}></TopNav>
              <Image src={eventimage}></Image>
              <Message>my first message</Message>
              </div>
                 
            <Breakpoint customQuery="(min-width: 1200px)">
            <RightNav></RightNav>
            </Breakpoint>
        </div>
        </BreakpointProvider>
    )
}

export default ChatPage
