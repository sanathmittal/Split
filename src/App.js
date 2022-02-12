import React,{useState,useEffect} from "react";
import './App.css';
import Routes from './Routes';
import {AuthContext} from "./Context"

import {auth,db} from "./Firebase"
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc,collection,getDocs } from "firebase/firestore";


function App() {

  const [user, setuser] = useState(null)
  const [uid ,setuid]=useState('')
  const [username, setusername] = useState(null)
  const [useremail, setuseremail] = useState(null)
  const [usersplits, setusersplits] = useState(null)
  const [userdp, setuserdp] = useState(null)
  const [userconnections, setuserconnections] = useState(null)

  

  // this function is being called 3 times
  useEffect(async ()=>{
    if(user){
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
      
        setusername(docSnap.data().name)
        setuseremail(docSnap.data().email)
        setuserdp(docSnap.data().profileDp)
   
       
           
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
     

    }
    else{
      return;
    }
  },[user])






  useEffect(async ()=>{
    if(user){
      const docRef = collection(db, "users",uid ,"Splits");
      const docSnap = await getDocs(docRef);
      setusersplits(docSnap.size)
    
    }
    else{
      return;
    }
  },[user])
  useEffect(async ()=>{
    if(user){
      const docRef = collection(db, "users",uid ,"connections");
      const docSnap = await getDocs(docRef);
      setuserconnections(docSnap.size)
    
    }
    else{
      return;
    }
  },[user])
  useEffect(()=>{
 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid)
        setuid(uid)
        setuser(user)
        
        // ...
      } else {
        // User is signed out
        // ...
        console.log("no user")
      }
    });
  },[])

  return (
   <AuthContext.Provider value={{uid:uid,user:user,username:username,useremail:useremail,usersplits:usersplits,userconnections:userconnections,userdp:userdp}}>
    <Routes></Routes>
    </AuthContext.Provider>
 
  );
}

export default App;
