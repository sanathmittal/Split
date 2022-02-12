import React from 'react';
import cancel from "../../assets/websiteimages/cancel.svg"
import "../css/PostImagePreview.css"
import {CSSTransition} from "react-transition-group"
function PostImagePreview(props) {


   
    return  <div className="postimagepreview">
      <img   onClick={()=>{ props.passcancel(false)}
           } src={cancel} className='postimagepreview-cancel'></img>
      <img src={props.media} className='postimagepreview-img'></img>
  </div>;
 
}

export default PostImagePreview;
