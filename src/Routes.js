import {
    BrowserRouter,
    Routes as Ways,
    Route,
    Navigate,
  useLocation

  } from "react-router-dom";
  import React,{useContext,useState,useEffect} from 'react'
  import Landingpage from './Pages/js/Landingpage';
  import HomePage from "./Pages/js/HomePage";
 import ProfilePage from "./Pages/js/ProfilePage";
import SplitPage from "./Pages/js/SplitPage";
import EventDetails from "./Pages/js/EventDetails";
import CreateSplit from "./Pages/js/CreateSplit";
import InsideEvent from "./Pages/js/InsideEvent";
import PostDetails from "./Pages/js/PostDetails";
import ChatPage from "./Pages/js/ChatPage";
  import {AuthContext} from "./Context"
 import PrivateRoute from "./private_route";
import PersonalRoute from "./Personal_Routes";
import ErrorPage from "./Pages/js/ErrorPage";
import ContactUs from "./Pages/js/ContactUs";

  function Routes() {

    


      return (
        <BrowserRouter>
        <Ways>
       
        <Route path="/" element={<Landingpage/>} />
       {/* <Route path="/home" exact element={<CustomWrapper  />}/>  */}
       {/* <Route path="/home" exact element={<HomePage/>}/> */}
       <Route  path="/home"  element={ <PrivateRoute>  <HomePage/>  </PrivateRoute> }/>
        <Route path="/profile/:uid" exact element={<PersonalRoute><ProfilePage/></PersonalRoute>}/>
        <Route path="/split/:sid" exact element={<SplitPage/>}/>
        <Route path="/eventdetails/:eid" exact element={<PrivateRoute> <EventDetails/></PrivateRoute>}/>
        <Route path="/:eid/createsplit" exact element={<PrivateRoute><CreateSplit/></PrivateRoute>}/>
        <Route path="/event/:eid" exact element={<InsideEvent/>}/>
        <Route path="/:eid/post/:pid" exact element={<PostDetails/>}/>
        <Route path="/:uid/chat" exact element={<PersonalRoute><ChatPage/></PersonalRoute>}/>
        {/* { auth.user? null : <Navigate from="/home" to="/" /> } */}
        <Route path="/error" exact element={<ErrorPage></ErrorPage>}/>
        <Route path="/contactus" exact element={<PrivateRoute><ContactUs></ContactUs> </PrivateRoute>}/>
        </Ways>
        </BrowserRouter>
      )
  }
  
  export default Routes
  