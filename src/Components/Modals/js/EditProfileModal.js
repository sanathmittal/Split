import React,{useContext,useState,useEffect} from 'react'
import "../css/EditProfileModal.css"
import {CSSTransition} from "react-transition-group"
import editimageicon from "../../../assets/websiteimages/editimage.svg"
import profileimage from "../../../assets/Dummyimages/profileimage.jpg"
import Avatar from "@material-ui/core/Avatar";
import {AuthContext} from "../../../Context"
import {storage,db} from "../../../Firebase"
import {  ref, uploadBytes ,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { doc ,getDoc,updateDoc } from "firebase/firestore";
function EditProfileModal(props) {
    const auth =useContext(AuthContext)
    const[name ,setname] =useState(auth.username ||'')
    const [image,setimage]=useState('')
    const [preview , setpreview]=useState(auth.userdp)
    const [error , seterror]=useState(null)

    useEffect(()=>{
        if(!image){
            
            return;
        }
        
        const filereader= new FileReader()
        filereader.onload=()=>{
            setpreview(filereader.result)
        }
        filereader.readAsDataURL(image)
    },[image])



const onSaveClick=(e)=>{
  
   e.preventDefault()
   if(name.length=== 0){
    seterror("Name can't be empty")
    return;
 }

const storageRef = ref(storage, `profiledps/${auth.uid}`);
const uploadTask = uploadBytesResumable(storageRef, image)
   
uploadTask.on(
  "state_changed",
  ()=>{

    getDownloadURL(ref(storage,`profiledps/${auth.uid}` ))
    .then(async (url) => {
    
      try{
          const washingtonRef = doc(db, "users", auth.uid);
  
          await updateDoc(washingtonRef, {
              profileDp:url,
              name:name
            });
            window.location.reload()}
      
      catch (error){
            console.log(error)
            seterror(error)
      }
    
  
    })
    .catch((error) => {
      // Handle any errors
      seterror(error)
    });
  
    
  }
)



}
    return (
        <CSSTransition  in={props.show} timeout={100} classNames="slide-in-left" mountOnEnter unmountOnExit >
        <div className='editprofilemodal'>
            <form className='editprofilemodal__form'>
            <div className='editprofilemodal__editimg'>
            <Avatar
        style={{ border: "1px solid gray", margin:-7,height:125 ,width:125 }}
        alt="GeeksforGeeks Pic 1"
        src={preview}
      />
      {/* <img src={preview}></img> */}
            <label htmlFor="editimage">
            <img src={editimageicon} className='editprofilemodal__icon'></img>
            </label>
        <input onFocus={()=>{seterror(null)}} onChange={(event)=>{setimage(event.target.files[0])
        console.log(event.target.files) }}  id="editimage" type="file"></input>
            </div>
            <div className='editprofilemodal__form-entry'>
            <p >Name:</p>
            <input onFocus={()=>{seterror(null)}} value={name||''} onChange={(e)=>{setname(e.target.value)}} type="text"></input>
            </div>
            <p className='editprofilemodal-errormessage'>{error}</p>
            <button onClick={onSaveClick}>save</button>
            </form>
            
        
        </div>
        </CSSTransition>
    )
}

export default EditProfileModal
