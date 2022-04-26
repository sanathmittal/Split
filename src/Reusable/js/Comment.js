import React,{useEffect, useState} from 'react'
import "../css/Post.css"
import like from "../../assets/websiteimages/like.svg"
import liked from "../../assets/websiteimages/liked.svg"
import comment from "../../assets/websiteimages/comment.svg"
import {  ref, runTransaction, set ,} from "firebase/database";
import {database} from "../../Firebase"
import { useNavigate} from 'react-router-dom';

function Post(props) {
     const [showmedia, setshowmedia] = useState(false)
    const[display,setDisplay]=useState("none")
    const [likes,setLikes]=useState()
    const [isLiked,setIsLiked]=useState(false)
    const Navigate=useNavigate()

    useEffect(()=>{
      if(!props.stars){
        return
      }
      if(props.stars[props.userSplitId] ){
        setIsLiked(true)
        
      }
      if(!props.stars[props.userSplitId] ){
        setIsLiked(false)
      }
      console.log(props.stars)
    },[props.postId])


useEffect(()=>{
 
  
  if(props.media===""){
   setDisplay("none")
  }else{
    setDisplay("block")
  }

},[props.media])


// const onPostClick=()=>{
//   Navigate(`/${props.eventId}/post/${props.postId}`,{state:{userSplitId:props.userSplitId,userAvatar:props.userAvatar,userSplitName:props.userSplitName}})
// }



function toggleStar () {
//  "Comments/" + `${props.eventId}/` + `${props.postId}/`
  const postRef = ref(database,  `/Comments/${props.eventId}/${props.parentPostId}/${props.postId}`);

  runTransaction(postRef, (post) => {
    if (post) {
      
      if (post.stars && post.stars[props.userSplitId] && post.starCount) {
        post.starCount--;
        post.nCount++;
        post.stars[props.userSplitId] = null;
        setIsLiked(false)
      } else {
        if (!post.stars) {
          console.log("running")
          post.stars = [];
           post.starCount=0
           post.nCount=0
        }
        post.starCount++;
        post.nCount--;
        post.stars[props.userSplitId] = true;
        setIsLiked(true)
        //post.stars.push(props.splitId) 
      }
      set(postRef,post)
    }

  });
}



    return (
        <div className='post' >
            <div className='post__top'>
                <img onClick={()=>{props.onProfileClick(props.splitId)}} src={props.splitAvatar}></img>
                <p className='post__top-name' onClick={()=>{props.onProfileClick(props.splitId)}}> {props.splitName}</p><span className='post__top-date'>.{props.date}</span>
            </div>
            <div className='post-content' >
                <p>{props.text}</p>
             <img  style={{display:display}} src={props.media} />
           
            </div>
            <div className='post__footer'>
                 <div className='post__actions'>
                      
                        <div className='post__action'>
                          <img onClick={toggleStar} className="post__likeicon"  src={isLiked ? liked :like}></img>
                          <p >{props.likes}</p>
                        </div>
                 </div>
            </div>
        </div>
    )
}

export default Post
