import React, { useEffect, useState } from 'react'
import "../css/EventCard.css"
import love from "../../assets/websiteimages/love.svg"
import { useNavigate } from "react-router-dom";
function EventCard(props) {
    const[buttonclass,setbuttonclass ]=useState()
   const[buttontext,setbuttontext]=useState() 
   const[isjoined,setisjoined]=useState(false) 
//    const[buttonfunction,setbuttonfunction]=useState() 

   const Navigate=useNavigate()

    useEffect(()=>{
       
                if(props.status === true){
                     setbuttonclass("button-engage")
                     setbuttontext("Engage")
                     setisjoined(true)
                    //  setbuttonfunction(onengageClick)
                }
                else{
                 setbuttonclass("button-join") 
                 setbuttontext("Join")
                 setisjoined(false)
                //  setbuttonfunction(onjoinClick)
                }
    },[props.status])

const onDetailsClick=()=>{
    Navigate(`/eventdetails/${props.eventId}`)
} 

const onjoinClick=()=>{
    Navigate(`/${props.eventId}/${props.heading}/createsplit`,{state:{Choices:props.Choices}})
}
const onengageClick=()=>{
    Navigate(`/event/${props.eventId}`,{state:{Choices:props.Choices}})
}


    return (
        <div className='eventcard'>
            <img src={props.image} />
            <div className='card-topinfo'>
               <p className='card-heading'>{props.heading}</p>
               <p className='card-participants'>Participants:{props.participants}</p>
            </div>
            <p className='card-des'>{props.des}</p>
            <div className='card-bottom'>
                <img src={love} />
                <div className='card-bottom__buttons'>
                <button className={buttonclass} onClick={isjoined ?onengageClick:onjoinClick}>{buttontext}</button>
                <button className='button-details' onClick={onDetailsClick}>Deatils</button>
                </div>
            </div>

        </div>
    )
}

export default EventCard
