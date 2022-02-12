import React from 'react'
import "../css/TopNav.css"
import backarrow from"../../assets/websiteimages/arrowleft.svg"
import menu from "../../assets/websiteimages/menu.svg"
import avatar from "../../assets/Dummyimages/profileimage.jpg"

function TopNav(props) {
    return (
        <div className='topnav'>
            <div className='topnav__icons'>
          
                     <img className='topnav__menu' src={menu} onClick={props.onMenuClick}></img>
                     <img className='topnav__avatar' src={avatar}></img>
                
            </div>
            <div className='topnav__below' >
            <img className='topnav__backarrow' src={backarrow}></img>
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
