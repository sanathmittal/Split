
import React,{useState,useContext} from 'react'
import "../css/ContactUs.css"
import LeftNav from '../../Components/js/LeftNav'
import LeftNavMobile from '../../Components/js/LeftNavMobile'
import RightNav from '../../Components/js/RightNav'
import TopNav from '../../Components/js/TopNav'
import Backdrop from '../../Reusable/js/Backdrop'
import { Breakpoint, BreakpointProvider } from "react-socks";
import {AuthContext} from "../../Context"
import { collection, addDoc } from "firebase/firestore"; 
import {db} from "../../Firebase"

function ContactUs() {
    const [showLeftNav,setShowLeftNav]=useState(false)
    const [query,setquery]=useState("")
const auth=useContext(AuthContext)

const onSendClick= async ()=>{
    

   

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "queries"), {
     query:query,
     userEmail:auth.useremail,
     userName:auth.username,
     userId:auth.uid
    });
    setquery("")
   // console.log("Document written with ID: ", docRef.id);
}

  return (
    <BreakpointProvider>
        <div className='contactus__container'>
        {showLeftNav && <Backdrop onClick={()=>{setShowLeftNav(false)}}></Backdrop>}
     <Breakpoint customQuery="(min-width: 1200px)">
            <LeftNav ></LeftNav>
            </Breakpoint>
            <LeftNavMobile show={showLeftNav} ></LeftNavMobile> 
            <div className='contactus-page'>
              <TopNav heading={"Contact Us"} onMenuClick={()=>{setShowLeftNav(true)}}></TopNav>
              <div className='conatctus-page__content'>
                  <p className='contactus-page__heading'>Contact us with your query</p>
                  <div className='contactus-page__form'>
                   <p className='contactus-page__subheading'>Query</p>
                   <textarea placeholder='Type here' value={query} onChange={(e)=>{setquery(e.target.value)}} ></textarea>
                   <p className='contactus-page__des'>contact us with a technical problem or you can also provide suggestions for the platform. if your problem or suggestion is genuine you will recieve a reply email. </p>
                  </div>
                   <button type='button' onClick={onSendClick}>Send</button>
              </div>
              </div>
                 
            <Breakpoint customQuery="(min-width: 1200px)">
            <RightNav></RightNav>
            </Breakpoint>
        </div>
        </BreakpointProvider>
  )
}

export default ContactUs