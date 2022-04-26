import React,{useContext,useState,useEffect} from "react";
import { Route, useNavigate ,Navigate} from "react-router-dom";
// import { useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { AuthContext } from "./Context";


const EventRoute = ({ children}) => {
const navigate=useNavigate()
const params=useParams()

const auth =useContext(AuthContext)
const [isAuth,setIsAuth]=useState( true)


// useEffect(()=>{
// if(auth.user ){
//  setIsAuth(true)
// }else{
//  setIsAuth(false)
// }
// },[auth.user])
// useEffect(()=>{
//   console.log(isAuth)
  
// },[isAuth])

// useEffect(()=>{
//   console.log(window.localStorage.getItem("SplitIsAuth"))
// },[])

return   window.localStorage.getItem("splitUserEvents").includes(params.eid) ? children: <Navigate to="/home" />;
};

export default EventRoute;