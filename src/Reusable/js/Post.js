import React,{useEffect, useState} from 'react'
import "../css/Post.css"
import like from "../../assets/websiteimages/like.svg"
import comment from "../../assets/websiteimages/comment.svg"
import {  ref, runTransaction } from "firebase/database";
import {database} from "../../Firebase"
import { useNavigate} from 'react-router-dom';

function Post(props) {
     const [showmedia, setshowmedia] = useState(false)
    const[display,setDisplay]=useState("none")
    const [likes,setLikes]=useState()

    const Navigate=useNavigate()

useEffect(()=>{
 
  
  if(props.media===""){
   setDisplay("none")
  }else{
    setDisplay("block")
  }
},[])


const onPostClick=()=>{
  Navigate(`/${props.eventId}/post/${props.postId}`,{state:{userSplitId:props.userSplitId,userAvatar:props.userAvatar,userSplitName:props.userSplitName}})
}

function toggleStar () {

  const postRef = ref(database,  `/posts/${props.eventId}/${props.postId}`);

  runTransaction(postRef, (post) => {
    if (post) {
      if (post.stars && post.stars[props.splitId]) {
        post.starCount--;
        post.stars[props.splitId] = null;
      } else {
        if (!post.stars) {
          post.stars = [];
          
        }
        post.starCount++;
        
        post.stars[props.splitId] = true;
      }
    }
   setLikes(post.starCount)
   console.log(post.stars)
   console.log(likes)
  });
}



    return (
        <div className='post' >
            <div className='post__top'>
                <img onClick={()=>{props.onProfileClick(props.splitId)}} src={props.splitAvatar}></img>
                <p className='post__top-name' onClick={()=>{props.onProfileClick(props.splitId)}}> {props.splitName}</p><span className='post__top-date'>.{props.date}</span>
            </div>
            <div className='post-content' onClick={onPostClick}>
                <p>{props.text}</p>
             <img  style={{display:display}} src={props.media} />
           
            </div>
            <div className='post__footer'>
                 <div className='post__actions'>
                        <div className='post__action'>
                          <img src={comment} onClick={()=>{props.commenticonClick(props.postId,props.splitName)}}></img>
                          <p>{props.comments}</p>
                        </div>
                        <div className='post__action'>
                          <img onClick={toggleStar} className="post__likeicon"  src={like}></img>
                          <p >{0}</p>
                        </div>
                 </div>
            </div>
        </div>
    )
}

export default Post
