import {
    BrowserRouter,
    Routes as Ways,
    Route,
    Navigate,
  useLocation

  } from "react-router-dom";
  import React,{useContext} from 'react'
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
  function Routes() {

    
   const auth =useContext(AuthContext)
  //  const CustomWrapper = () => {
  //   const location = useLocation();
  //   return (auth.user===null)? (
  //     <HomePage />
  //   ) : (
  //     <Navigate
  //       to={`/`}
  //       replace
  //       state={{ location }}
  //     />
  //   )
  // };

      return (
        <BrowserRouter>
        <Ways>
       
        <Route path="/" element={<Landingpage/>} />
       {/* <Route path="/home" exact element={<CustomWrapper  />}/>  */}
       <Route path="/home" exact element={<HomePage/>}/>
        <Route path="/profile/:uid" exact element={<ProfilePage/>}/>
        <Route path="/split/:sid" exact element={<SplitPage/>}/>
        <Route path="/eventdetails/:eid" exact element={<EventDetails/>}/>
        <Route path="/:eid/:ename/createsplit" exact element={<CreateSplit/>}/>
        <Route path="/event/:eid" exact element={<InsideEvent/>}/>
        <Route path="/:eid/post/:pid" exact element={<PostDetails/>}/>
        <Route path="/:sid/chat" exact element={<ChatPage/>}/>
        {/* { auth.user? null : <Navigate from="/home" to="/" /> } */}
       
        </Ways>
        </BrowserRouter>
      )
  }
  
  export default Routes
  