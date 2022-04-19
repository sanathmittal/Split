import React,{useState} from 'react'
import "../css/ErrorPage.css"
import LeftNav from '../../Components/js/LeftNav'
import LeftNavMobile from '../../Components/js/LeftNavMobile'
import RightNav from '../../Components/js/RightNav'
import TopNav from '../../Components/js/TopNav'
import Backdrop from '../../Reusable/js/Backdrop'
import { Breakpoint, BreakpointProvider } from "react-socks";
import error from "../../assets/websiteimages/errorvector.svg"
function ErrorPage() {
const [showLeftNav,setShowLeftNav]=useState(false)

  return (
    <BreakpointProvider>
        <div className='errorpage__container'>
        {showLeftNav && <Backdrop onClick={()=>{setShowLeftNav(false)}}></Backdrop>}
     <Breakpoint customQuery="(min-width: 1200px)">
            <LeftNav ></LeftNav>
            </Breakpoint>
            <LeftNavMobile show={showLeftNav} ></LeftNavMobile> 
            <div className='error-page'>
              <TopNav heading={"Error"} onMenuClick={()=>{setShowLeftNav(true)}}></TopNav>
              <div className='error-page__content'>
                  <div className='error-page__content-img'>
                  <img src={error}></img>
                  </div>
                
                <p className='error-page__heading'>Some error occurred</p>
                <p className='error-page__subheading'>Check your network connection or try again after sometime.</p>
              </div>
              </div>
                 
            <Breakpoint customQuery="(min-width: 1200px)">
            <RightNav></RightNav>
            </Breakpoint>
        </div>
        </BreakpointProvider>
  )
}

export default ErrorPage