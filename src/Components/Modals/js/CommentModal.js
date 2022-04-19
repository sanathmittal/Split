import React, { useState, useStates, useEffect, useContext } from "react";
import "../css/CommentModal.css";
import mediaicon from "../../../assets/websiteimages/mediaicon.svg";
import { CSSTransition } from "react-transition-group";
import PostImagePreview from "../../js/PostImagePreview";
import { ref, push, set, onValue } from "firebase/database";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import {
  ref as Storageref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { database, db, storage } from "../../../Firebase";
import { AuthContext } from "../../../Context";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../../Reusable/js/Loading";
import Backdrop from "../../../Reusable/js/Backdrop";
import WhiteBackDrop from "../../../Reusable/js/WhiteBackDrop";

function CommentModal(props) {
  const [text, settext] = useState("");
  //const [textHeight, settextHeight] = useState("auto");
  const[isLoading,setISLoading]=useState(false)
  const [image, setimage] = useState("");
  const [preview, setpreview] = useState("");
  const [error, seterror] = useState(null);
  const [showpreview, setshowpreview] = useState(false);
  const [postId, setPostId] = useState();
  const [date, setDate] = useState("");

  const auth = useContext(AuthContext);
  const htmlId = uuidv4();
 
  useEffect(() => {
    if (image === "") {
      return;
    }

    const filereader = new FileReader();
    filereader.onload = () => {
      setpreview(filereader.result);
    };
    filereader.readAsDataURL(image);
    setshowpreview(true);
  }, [image]);

  const passcancel = (data) => {
    setshowpreview(data);
    setimage("");
    setpreview("");
  };

  const onCommentClick = (e) => {
    //   setPostId(htmlId)
    
    e.preventDefault();
    let month = new Date().getMonth();
    let realmonth = month + 1;
    const day = new Date().getDay();

    const year = new Date().getFullYear();
    const newDate=`${day}/${realmonth}/${year}`
    setDate(`${day}/${realmonth}/${year}`);
    console.log(date);

    if (text === "" && image === "") {
      seterror(" cant create a  empty  Comment");
      console.log("error,empty commentost");
      return;
    }
    if (text.length > 0 && image === "") {
      setISLoading(true)
     // console.log("ruunig without image");
      try {
        
        const postListRef = ref(  database, "Comments/" + `${props.eventId}/` + `${props.postId}/` );
        const newPostRef = push(postListRef);
        set(
         newPostRef,
          {
            text: text,
            image: image,
            creator: props.splitId,
            creatorName: props.splitName,
            creatorAvatar: props.splitAvatar,
            createdAt: date,
            PostId:newPostRef.key,
          }
        );
    
        setimage("");
        settext("");
        setpreview();
        setshowpreview(false);
        props.setModal(false);
        setISLoading(false)
        return;
      } catch (error) {
        console.log(error);
      }
    }
    setISLoading(true)
    const storageRef = Storageref(
      storage,
      `CommentImages/${props.eventId}/${htmlId}`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);
    //  .then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });

    // getDownloadURL(Storageref(storage,`PostImages/${props.eventId}/${htmlId}` ))
    //   .then(async (url) => {console.log(url)})

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(
          Storageref(storage, `CommentImages/${props.eventId}/${htmlId}`)
        ).then(async (url) => {
          try {
            // Create a new post reference with an auto-generated id
            const postListRef = ref(database,  "Comments/" + `${props.eventId}/` + `${props.postId}/` );
            const newPostRef = push(postListRef);
            set(
              newPostRef,
              {
                text: text,
                image: url,
                creator: props.splitId,
                creatorName: props.splitName,
                creatorAvatar: props.splitAvatar,
                createdAt: date,
                PostId: newPostRef.key,
                nCount:0
              }
            );
       

            setimage("");
            settext("");
            setpreview();
            setshowpreview(false);
            props.setModal(false);
            setISLoading(false)
          } catch (error) {
            console.log(error);
            seterror(error);
          }
        });
      }
    );
   // 
  };
 

  return (
    <CSSTransition
      in={props.show}
      timeout={100}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >

      <div className="commentmodal">
        {isLoading &&  
        <WhiteBackDrop></WhiteBackDrop>
   
         }
      
        <p>Commenting on {props.postCreatorName}</p>
        <div className="commentmodal-text">
          <img src={props.splitAvatar}></img>
          <div className="commentmodal-text-content">
            <textarea
              id="txt"
              value={text}
              onChange={(e) => {
                settext(e.target.value);
              }}
              placeholder="Type Here"
              type="text"
            ></textarea>
            {showpreview && (
              <PostImagePreview
                passcancel={passcancel}
                media={preview}
              ></PostImagePreview>
            )}
          </div>
        </div>
        <div className="commentmodal-actions">
          <label htmlFor="comment-media">
            <img src={mediaicon}></img>
          </label>
          <input
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            type="file"
            id="comment-media"
          ></input>
          <button
            onClick={onCommentClick}
            //    onClick={onPostClick}
          >
            Comment
          </button>
        </div>
            <div className="loading">
            {isLoading &&  <Loading></Loading>}
            </div>
       
   
      </div>
    </CSSTransition>
  );
}

export default CommentModal;
