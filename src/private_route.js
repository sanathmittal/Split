import React,{useContext,useState,useEffect} from "react";
import { Route, useNavigate ,Navigate} from "react-router-dom";
// import { useSelector } from "react-redux";

import { AuthContext } from "./Context";


const PrivateRoute = ({ children}) => {
const navigate=useNavigate()


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

return   window.localStorage.getItem("SplitIsAuth") ? children: <Navigate to="/" />;
};

export default PrivateRoute;