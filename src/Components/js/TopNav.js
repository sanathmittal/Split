import React,{useContext} from 'react'
import "../css/TopNav.css"
import backarrow from"../../assets/websiteimages/arrowleft.svg"
import menu from "../../assets/websiteimages/menu.svg"
import avatar from "../../assets/Dummyimages/profileimage.jpg"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../../Context"
import chaticon from "../../assets/websiteimages/chaticon.svg"

function TopNav(props) {
 const navigate=useNavigate()
const auth=useContext(AuthContext)

    return (
        <div className='topnav'>
            <div className='topnav__icons'>
          
                     <img className='topnav__menu' src={menu} onClick={props.onMenuClick}></img>
                     <img className='topnav__avatar' src={auth.userdp} onClick={()=>{navigate(`/profile/${auth.uid}`)}}  ></img>
                     <img className='topnav__chat' src={chaticon} onClick={()=>{navigate(`/${auth.uid}/chat`)}} ></img>
            </div>
            <div className='topnav__below' >
            <img onClick={()=>{navigate(-1)}} className='topnav__backarrow' src={backarrow}></img>
             <img className='topnav__image'></img>
            <div className='topnav__text'>
                 <p className='topnav__page-heading'>{props.heading}</p>
                 <p className='topnav__page-info'>{props.info}</p>  
            </div>
            </div>
           
            
        </div>
    )
}

export default TopNav
