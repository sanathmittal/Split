import React,{useState,useEffect} from "react";
import './App.css';
import Routes from './Routes';
import {AuthContext} from "./Context"

import {auth,db} from "./Firebase"
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc,collection,getDocs } from "firebase/firestore";
import { Navigate ,useNavigate} from "react-router-dom";


function App() {

  const [user, setuser] = useState(null)
  const [uid ,setuid]=useState('')
  const [username, setusername] = useState(null)
  const [useremail, setuseremail] = useState(null)
  const [usersplitscount, setusersplitscount] = useState(null)
  const [userdp, setuserdp] = useState(null)
  const [userconnections, setuserconnections] = useState(null)
   const [userSplits,setuserSplits]=useState([])
  const [userEvents,setUserEvents]=useState([])
// const navigate = useNavigate()

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
      }
      // if(window.localStorage.getItem("SplitIsAuth") && !user){
      //  console.log("error is here")
      // }


      else {
        // User is signed out
        // ...
        console.log("no user")
      }
    });
  },[])



  // this function is being called 3 times
  useEffect(async ()=>{
    if(user){
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
      
        setusername(docSnap.data().name)
        setuseremail(docSnap.data().email)
        setuserdp(docSnap.data().profileDp)
          setUserEvents(docSnap.data().Events)
     
           
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
     

    }
    else{
      return;
    }
  },[user])

useEffect(()=>{
  window.localStorage.setItem("splitUserEvents",userEvents)
},[userEvents])




  useEffect(async ()=>{
    if(user){
      const docRef = collection(db, "users",uid ,"Splits");
      const docSnap = await getDocs(docRef);
      setusersplitscount(docSnap.size)
    
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

  const splits = [];

  // useEffect(async () => {
  
  //   if(uid=== ''){
  //     return;
  //   }
  
  //   const q = collection(db, "users",uid,"Splits");
  
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     // console.log(doc.data())
  
  //       // console.log(doc.id, " => ", doc.data());
  //     const data = doc.data();
  //     splits.push({ ...data, splitId: doc.id });
  //     // setuserSplits(oldArray => [...oldArray,{...data,splitId:doc.id}] );
 
  //   });
  
  //     setuserSplits([...splits]) 
     
  // // console.log(querySnapshot)
  //   // setuserSplits(splits);
  //   // // console.log(splits)
  // console.log(userSplits)
  // }, [uid]);


//,usersplits:userSplits
  return (
   <AuthContext.Provider value={{uid:uid,user:user,username:username,useremail:useremail,usersplits:usersplitscount,userconnections:userconnections,userdp:userdp}}>
    <Routes></Routes>
    </AuthContext.Provider>
 
  );
}

export default App;
