import React, { useState,useContext,useEffect} from 'react'
import "../css/ProfilePage.css"
import RightNav from '../../Components/js/RightNav'
import LeftNav from "../../Components/js/LeftNav"
import settings from "../../assets/websiteimages/settings.svg"
import EventCard from '../../Reusable/js/EventCard'
import eventimage from "../../assets/Dummyimages/eventimage.jpg"
import SplitCard from '../../Reusable/js/SplitCard'
import ProfileSettingsModal from '../../Components/Modals/js/ProfileSettingsModal'
import {
  collection,
  getDocs,
 
} from "firebase/firestore";
import {db} from "../../Firebase"
import TopNav from '../../Components/js/TopNav'
import Backdrop from '../../Reusable/js/Backdrop'
import LeftNavMobile from '../../Components/js/LeftNavMobile'
import DeleteConfirmationModal from '../../Components/Modals/js/DeleteConfirmationModal'
import ChangePasswordModal from '../../Components/Modals/js/ChangePasswordModal'
import EditProfileModal from '../../Components/Modals/js/EditProfileModal'
import  { Breakpoint, BreakpointProvider } from 'react-socks';
import Avatar from "@material-ui/core/Avatar";
import {AuthContext} from "../../Context"
import { useNavigate } from "react-router-dom";
import Loading from '../../Reusable/js/Loading'
function ProfilePage() {
  const [isLoading,setIsLoading]=useState(false)
    const[showSplits,setShowSplits]=useState(true)
    const[Splits,setSplits]=useState([])
    const[showLeftNav,setShowLeftNav]=useState(false)
    const[showBackdrop,setbackdrop]=useState(false)
    const[profileSettingsModal,setProfileSettingsModal]=useState(false)
    const[deleteConfirmationModal,setDeleteConfirmationModal]=useState(false)
    const[changePasswordModal,setChangePasswordModal]=useState(false)
    const[editProfileModal,setEditProfileModal]=useState(false)
   
    const Navigate=useNavigate()
     const auth = useContext(AuthContext)

  const onBackdropClick=()=>{
      setbackdrop(false)
      setShowLeftNav(false)
      setProfileSettingsModal(false)
      setDeleteConfirmationModal(false)
      setChangePasswordModal(false)
      setEditProfileModal(false)
  }
  const onDeleteAccountclick=()=>{
      setDeleteConfirmationModal(true)
      setProfileSettingsModal(false)
  }
  const onChangePasswordClick=()=>{
    setProfileSettingsModal(false)
      setChangePasswordModal(true)
     
  }
  const onEditProfileClick=()=>{
    setProfileSettingsModal(false)
      setEditProfileModal(true)
     
  }



//   if(!auth.uid){
//     return <Navigate to="/"></Navigate>
// }


useEffect(async () => {
  setIsLoading(true)
  const splits = [];

  const q = collection(db, "users",auth.uid,"Splits");

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.data())

    //   console.log(doc.id, " => ", doc.data());
    const data = doc.data();
    splits.push({ ...data, splitId: doc.id });
  });

  setSplits(splits);
  setIsLoading(false)
console.log("sasa",auth.usersplits)
}, [auth.uid]);

    return (
     
        <BreakpointProvider>
        <div className='profilepage-container'>
        {showBackdrop && <Backdrop onClick={onBackdropClick}></Backdrop>}
     <Breakpoint customQuery="(min-width: 1200px)">
            <LeftNav ></LeftNav>
            </Breakpoint>
            <LeftNavMobile show={showLeftNav} className="homepage-leftnav"></LeftNavMobile> 
            <ProfileSettingsModal onDeleteAccountClick={onDeleteAccountclick} onChangePasswordClick={onChangePasswordClick} onEditProfileClick={onEditProfileClick} show={profileSettingsModal}></ProfileSettingsModal> 
            <DeleteConfirmationModal show={deleteConfirmationModal}></DeleteConfirmationModal> 
            <ChangePasswordModal show={changePasswordModal}></ChangePasswordModal> 
            <EditProfileModal show={editProfileModal}></EditProfileModal> 
            <div className='profile-page'>
              <TopNav heading={` ${auth.username}`} onMenuClick={()=>{setShowLeftNav(true)}}></TopNav>
              <div className='profile-container'>
              <div className='profile-page__profile'>
                   {/* <img className='profile-img' src={profileimage}></img> */}
         <div className='profile-img'>
         <Avatar
        style={{ border: "1px solid gray", margin:-7,height:125 ,width:125 }}
        alt="GeeksforGeeks Pic 1"
        src={auth.userdp}

      />
         </div>
            
      <div className='profile__right'>
      <div className='profile-text'>
                     <p className='profile-name'>{auth.username}</p>
                     <p className='profile-email'>Email: <span>{auth.useremail}</span></p>
                     <div className='profile-info'>
                     <p className='profile-splits'>Splits: <span>{auth.usersplits}</span></p>
                     <p className='profile-connections'>Connections: <span>{auth.userconnections}</span></p>
                     </div>
                   </div>
                   <img className='settings-icon' onClick={()=>{setbackdrop(true) 
                  setProfileSettingsModal(true)}} src={settings}></img>
      </div>
                   
              </div>
              </div>
              {/* <img src={line} className='line' ></img> */}
              <div className='profile-page__options-container'>
              <div className='profile-page__options'>
                  <p onClick={()=>{setShowSplits(true)}}>Splits</p>
                  <p onClick={()=>{setShowSplits(false)}}>Events</p>
              </div>
              </div>
              <div className='profile-page-eventscontainer'>
              {!showSplits &&  <div className='profile-page-events'>
              <EventCard image={eventimage} heading={"Heritage contest"} des={"our collage is organising heriatge contest on the heritage day you are welcomed to join this evnt and connect with  and shre you views......"} status="Joined" participants={"25"}  ></EventCard>
              <EventCard image={eventimage} heading={"Heritage contest"} des={"our collage is organising heriatge contest on the heritage day you are welcomed to join this evnt and connect with  and shre you views......"} status="Joined"  participants={"25"}  ></EventCard>
              <EventCard image={eventimage} heading={"Heritage contest"} des={"our collage is organising heriatge contest on the heritage day you are welcomed to join this evnt and connect with  and shre you views......"} status="Joined"  participants={"25"}  ></EventCard>
              <EventCard image={eventimage} heading={"Heritage contest"} des={"our collage is organising heriatge contest on the heritage day you are welcomed to join this evnt and connect with  and shre you views......"} status="Joined"  participants={"25"}  ></EventCard>
              <EventCard image={eventimage} heading={"Heritage contest"} des={"our collage is organising heriatge contest on the heritage day you are welcomed to join this evnt and connect with  and shre you views......"} status="Joined"  participants={"25"}  ></EventCard>
              </div> }
              </div>
              {
                  showSplits && <div className='profile-page-splits'>
                      
                       {Splits.map((split)=><SplitCard  onClick={()=>{Navigate(`/split/${split.splitId}`)}} avatar={split.avatar}  name={split.name} event={split.eventName} key={split.splitId} id={split.splitId} ></SplitCard>)}
                      {isLoading && <Loading></Loading>}
                  </div>
              }
             
            </div>
            <Breakpoint customQuery="(min-width: 1200px)">
            <RightNav className="homepage-rightnav"></RightNav>
            </Breakpoint>
        </div>
        </BreakpointProvider>
       
    )
}

export default ProfilePage
