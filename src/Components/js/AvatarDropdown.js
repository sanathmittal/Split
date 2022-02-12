import React,{useEffect,useState} from 'react';
import "../css/AvatarDropdown.css"
import girl5 from "../../assets/Dummyimages/Girl8.jpg";
import { doc, getDoc } from "firebase/firestore";
import {db} from "../../Firebase"
import Avatar from "@material-ui/core/Avatar";
import nextId from "react-id-generator";
import { useNavigate } from 'react-router-dom';
function AvatarDropdown(props) {
   const[category1,setCategory1]=useState([])
   const[category2,setCategory2]=useState([])
   const[category3,setCategory3]=useState([])
   const[category4,setCategory4]=useState([])
   const[category5,setCategory5]=useState([])
    const[avatar,setavatar]=useState('')



    


  useEffect( async ()=>{


    const docRef = doc(db, "avatars", "urls");
    const docSnap = await getDoc(docRef);

    
    
    if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
      setCategory1(docSnap.data().Category)
      setCategory2(docSnap.data().Category2)
      setCategory3(docSnap.data().Category3)
      setCategory4(docSnap.data().Category4)
      setCategory5(docSnap.data().Category5)
     
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
 
  },[])

  return <div className='avatardropdown'>
<div className='avatardropdown-category' >
{category1.map(url=>
        
        <Avatar
        key={nextId("avatar-")}
        id={nextId("avatar-")}
        className='avatardropdown-category-avatar'
        style={{  margin:-7,height:70 ,width:70 }}
        alt="GeeksforGeeks Pic 1"
        src={url}
        onClick={()=>{ props.passavatar(url)}
           }
      />
        )}
</div>
<div className='avatardropdown-category' >
{category2.map(url=>
        
        <Avatar
        key={nextId("avatar-")}
        id={nextId("avatar-")}
        className='avatardropdown-category-avatar'
        style={{  margin:-7,height:70 ,width:70 }}
        alt="GeeksforGeeks Pic 1"
        src={url}
        onClick={()=>{ props.passavatar(url)}
           }
        
      />
        )}
</div>
<div className='avatardropdown-category' >
{category3.map(url=>
        
        <Avatar
        key={nextId("avatar-")}
        id={nextId("avatar-")}
        className='avatardropdown-category-avatar'
        style={{  margin:-7,height:70 ,width:70 }}
        alt="GeeksforGeeks Pic 1"
        src={url}
        onClick={()=>{ props.passavatar(url)}
    }
      />
        )}
</div>
<div className='avatardropdown-category' >
   
{category4.map(url=>
        
        <Avatar
        key={nextId("avatar-")}
        id={nextId("avatar-")}
        className='avatardropdown-category-avatar'
        style={{  margin:-7,height:70 ,width:70 }}
        alt="GeeksforGeeks Pic 1"
        src={url}
        onClick={()=>{ props.passavatar(url)}
           }
      />
        )}
</div>
<div className='avatardropdown-category' >
{category5.map(url=>
        
        <Avatar
        key={nextId("avatar-")}
        id={nextId("avatar-")}
        className='avatardropdown-category-avatar'
        style={{  margin:-7,height:70 ,width:70 }}
        alt="GeeksforGeeks Pic 1"
        src={url}
        onClick={()=>{ props.passavatar(url)}
    }
      />
        )}
</div>
     
  </div>;
}

export default AvatarDropdown;
