import React, { useState, useEffect, useContext } from "react";
import mediaicon from "../../../assets/websiteimages/mediaicon.svg";
import postimage from "../../../assets/Dummyimages/postimage.jpg";
import girl from "../../../assets/Dummyimages/Girl1.jpg";
import "../css/PostModal.css";
import { CSSTransition } from "react-transition-group";
import PostImagePreview from "../../js/PostImagePreview";
import { ref, push, set , onValue } from "firebase/database";
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
import nextId from "react-id-generator";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../../Reusable/js/Loading";
import WhiteBackDrop from "../../../Reusable/js/WhiteBackDrop";
import LLoading from "../../../Reusable/js/LLoading";

function PostModal(props) {
  const[isLoading ,setIsLoading]=useState(false)
  const [text, settext] = useState("");
  const [textHeight, settextHeight] = useState("auto");

  const [image, setimage] = useState("");
  const [preview, setpreview] = useState("");

  const [error, seterror] = useState(null);
  const [showpreview, setshowpreview] = useState(false);
  const [postId, setPostId] = useState();
  const [date, setDate] = useState("");

  const [recentPostId,setRecentPostId]=useState("")

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

  const onPostClick = (e) => {
    //   setPostId(htmlId)
    e.preventDefault();
    let month = new Date().getMonth();
    let realmonth = month + 1;
    const day = new Date().getDay();

    const year = new Date().getFullYear();

    setDate(`${day}/${realmonth}/${year}`);
    // console.log(date);

    if (text === "" && image === "") {
      seterror(" cant create a  empty  post");
      console.log("error,empty post")
      return;
    }
    if(text.length> 0 && image === ""){
      setIsLoading(true)
        // console.log("ruunig without image")
          try {
            const postListRef = ref(database, "posts/" + `${props.eventId}/` );
const newPostRef = push(postListRef);
set(newPostRef, {
  text: text,
  image: '',
  creator: props.splitId,
  creatorName: props.splitName,
  creatorAvatar: props.splitAvatar,
  createdAt: date,
  PostId:newPostRef.key,
  nCount:0
});


            setimage('')
            settext("")
            setpreview() 
            setshowpreview(false)
            setIsLoading(false)
            props.setModal(false)
            props.setModalTrue(true)
            
            props.onRecentPostId(newPostRef.key)
        
            console.log("pm",newPostRef.key)
            //return;
          } catch (error) {
            console.log(error)
          }
    }

if(image !== ""){
  setIsLoading(true)
    const storageRef = Storageref(
      storage,
      `PostImages/${props.eventId}/${htmlId}`
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
        console.log("Upload is " + progress + "% done");
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
          Storageref(storage, `PostImages/${props.eventId}/${htmlId}`)
        ).then(async (url) => {
          try {
            // Create a new post reference with an auto-generated id

            const postListRef = ref(database, "posts/" + `${props.eventId}/` );
            const newPostRef = push(postListRef);
            set(newPostRef, {
              text: text,
              image: url,
              creator: props.splitId,
              creatorName: props.splitName,
              creatorAvatar: props.splitAvatar,
              createdAt: date,
              PostId:newPostRef.key,
              nCount:0
            });
           // setRecentPostId(newPostRef.key)
          
            // set(ref(database, "posts/" + `${props.eventId}/` + htmlId), {
            //   text: text,
            //   image: url,
            //   creator: props.splitId,
            //   creatorName: props.splitName,
            //   creatorAvatar: props.splitAvatar,
            //   createdAt: date,
            //   PostId:htmlId
            // });

            setimage('')
            settext("")
            setpreview()
            setshowpreview(false)
            setIsLoading(false)
            props.setModal(false)
            props.setModalTrue(true)
            props.onRecentPostId(newPostRef.key)

            console.log("pm",newPostRef.key)
          } catch (error) {
            console.log(error);
            seterror(error);
          }

        });
      }
      
    );
    }
  };

  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //     seterror(error)
  //   });

  // }

  return (
    <CSSTransition
      in={props.show}
      timeout={100}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <div className="postmodal">
        {isLoading && <WhiteBackDrop></WhiteBackDrop>}
        <div className="postmodal-text">
          <img src={props.splitAvatar}></img>
          <div className="postmodal-text-content">
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
        <div className="postmodal-actions">
          <label htmlFor="post-media">
            <img src={mediaicon}></img>
          </label>
          <input
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
            type="file"
            id="post-media"
          ></input>
          <button onClick={onPostClick}>Post</button>
          {isLoading && 
          // <LLoading></LLoading>
          <Loading></Loading>
          }
        </div>
      </div>
    </CSSTransition>
  );
}

export default PostModal;
