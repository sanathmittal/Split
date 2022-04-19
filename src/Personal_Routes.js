import React,{useContext,useState,useEffect} from "react";
import { Route, useNavigate ,Navigate} from "react-router-dom";
// import { useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { AuthContext } from "./Context";


const PersonalRoute = ({ children}) => {
const navigate=useNavigate()


const auth =useContext(AuthContext)
const [isAuth,setIsAuth]=useState( true)
const params=useParams()

// useEffect(()=>{
//   console.log(window.localStorage.getItem("SplitIsAuth"))
// },[])

return   (window.localStorage.getItem("SplitIsAuth") === params.uid) ? children: <Navigate to="/" />;
};

export default PersonalRoute;