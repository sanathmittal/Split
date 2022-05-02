import React, { useState, useContext, useEffect } from "react";
import RightNav from "../../Components/js/RightNav";
import LeftNav from "../../Components/js/LeftNav";
import TopNav from "../../Components/js/TopNav";
import Backdrop from "../../Reusable/js/Backdrop";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import { Breakpoint, BreakpointProvider } from "react-socks";
import girl1 from "../../assets/Dummyimages/Girl1.jpg";
import postimage from "../../assets/Dummyimages/postimage.jpg";
import "../css/InsideEvent.css";
import Post from "../../Reusable/js/Post";
import PostModal from "../../Components/Modals/js/PostModal";
import ProfileDetailModal from "../../Components/Modals/js/ProfileDetailModal";
import ChoosingpeopleModal from "../../Components/Modals/js/ChoosingpeopleModal";         
import CommentModal from "../../Components/Modals/js/CommentModal";
import { AuthContext } from "../../Context";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { database, db } from "../../Firebase";

import { useNavigate, useParams,useLocation } from "react-router-dom";
import { ref, push, set, onValue , query as databasequery,orderByValue,orderByChild} from "firebase/database";
import Loading from "../../Reusable/js/Loading";


function InsideEvent() {
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const [showPostModal, setPostModal] = useState(false);
  const [showCommentModal, setCommentModal] = useState(false);
  const [showChooseModal,setChooseModal]=useState(false)
  const [showProfileDetail, setshowProfileDetail] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [splitid, setsplitid] = useState("");
  const [isLiked,setIsLiked]=useState(false)
  const [recentPostId,setRecentPostId]=useState("")
  const [split, setSplit] = useState({
    name: "",
    avatar: "",
    bio:"",
    id:"",
  });
  const [viewSplit, setViewSplit] = useState({
    name: "",
    bio: "",
    avatar: "",
    connections: "",
    id: "",
    Choices:[]
  });
  const [posts, setPosts] = useState([]);
  const [commentingonpostId, setCommentingOnPostId] = useState("");
  const [postCreatorName, setPostCreatorName] = useState("");

  const auth = useContext(AuthContext);
  const params = useParams();
const location=useLocation()

  const onBackdropClick = () => {
    setPostModal(false);
    setShowLeftNav(false);
    setBackdrop(false);
    setCommentModal(false);
    setshowProfileDetail(false);
    setChooseModal(false)
  };

  const setModal = (data) => {
    // setBackdrop(data);
    setPostModal(data);
    setCommentModal(data);
 
  };
  const setChoosingModal=(data)=>{
    setChooseModal(false)
    setBackdrop(false);
  }

  const setModalTrue=(data)=>{
    setChooseModal(true)
  }

  const onRecentPostId=(data)=>{
    console.log(data)
   setRecentPostId(data)
  }


  const commenticonClick = (postId, postCreatorName) => {
    setCommentingOnPostId(postId);
    setPostCreatorName(postCreatorName);

    setCommentModal(true);
    setBackdrop(true);
  };

//******************** fetching Choices ***********************/
const[choices,setChoices]=useState([])
useEffect(async () => {
  if (params.eid=== "") {
    return;
  }

  const docRef = doc(db, "Events",params.eid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   
    setChoices(docSnap.data().Choices)
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}, [params.eid]);


  useEffect(async () => {
    if(auth.uid === null){
      return
    }
    const q = query(
      collection(db, "users", auth.uid, "Splits"),
      where("event", "==", params.eid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id)
      // doc.data() is never undefined for query doc snapshots
      setsplitid(doc.id);
      // console.log(doc.id, " => ", doc.data());
    });
  }, [auth.uid, params.eid, splitid]);

  useEffect(async () => {
    if (splitid === "") {
      return;
    }

    const docRef = doc(db, "users", auth.uid, "Splits", splitid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSplit({
        name: docSnap.data().name,
        avatar: docSnap.data().avatar,
        bio:docSnap.data().bio,
        id:splitid
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, [splitid]);


//******************fetching posts *********************** */
const [priorityPosts,setPriorityPosts]=useState([])


  useEffect(() => {
 
    let priorityArray=[]
    let normalArray=[]
    let dataArray=[]
    setIsLoading(true)
    const postsRef =databasequery( ref(database, "posts/" + `${params.eid}/`), orderByChild('nCount'))
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
       priorityArray=[]
       normalArray=[]
        dataArray=[]
      if (data === null) {
        return;
      }
      if(splitid === null){
        return;
      }
      snapshot.forEach((child)=> {
        dataArray.push(child.val())
    });

      
      console.log(dataArray)
           dataArray.forEach((post)=>{
            
             if(post.PriorityUsers === undefined){
              normalArray.push(post)
               return;
             }
             if(post.PriorityUsers === null){
              normalArray.push(post)
               return;
             }
             if(post.PriorityUsers.includes(splitid)){
                priorityArray.push(post)
                
             }
             else{
               normalArray.push(post)
             }
           })
           console.log("p",priorityArray)
           console.log("n",normalArray)
           console.log(splitid)
      setPosts(normalArray)
     setPriorityPosts(priorityArray)
            setIsLoading(false)
    });
  }, [params.eid,splitid]);

  const onProfileClick = async (data) => {
    const docRef = doc(db, "Events", params.eid, "Participants", data);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setViewSplit({
        name: docSnap.data().name,
        avatar: docSnap.data().avatar,
        bio: docSnap.data().bio,
        connections: "0",
        id: data,
        userId: docSnap.data().user,
        Choices:docSnap.data().choices
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    setshowProfileDetail(true);
    setBackdrop(true);
  };


//********************ChoosePepoleModal**************************/



  return (
    <BreakpointProvider>
      <div className="insideeventpage__container">
        {backdrop && <Backdrop onClick={onBackdropClick}></Backdrop>}
        <ChoosingpeopleModal
          show={showChooseModal}
          Choices={choices}
          eventId={params.eid}
          RecentPostId={recentPostId}
          setModal={ setChoosingModal}
        ></ChoosingpeopleModal>
        <PostModal
          splitId={splitid}
          userId={auth.uid}
          splitName={split.name}
          splitAvatar={split.avatar}
          eventId={params.eid}
          show={showPostModal}
          setModal={setModal}
          setModalTrue={setModalTrue}
          onRecentPostId={onRecentPostId}
        ></PostModal>
        <CommentModal
          splitId={splitid}
          userId={auth.uid}
          splitName={split.name}
          postCreatorName={postCreatorName}
          postId={commentingonpostId}
          splitAvatar={split.avatar}
          eventId={params.eid}
          show={showCommentModal}
          setModal={setModal}
        ></CommentModal>
        <ProfileDetailModal
            selfUser={split}
          show={showProfileDetail}
          name={viewSplit.name}
          avatar={viewSplit.avatar}
          connections={viewSplit.connections}
          bio={viewSplit.bio}
          viewSplitId={viewSplit.id}
          userId={viewSplit.userId}
          splitId={splitid}
          Choices={viewSplit.Choices}
        ></ProfileDetailModal>
        <Breakpoint customQuery="(min-width: 1200px)">
          <LeftNav></LeftNav>
        </Breakpoint>
        <LeftNavMobile show={showLeftNav}></LeftNavMobile>
        <div className="insideeventpage">
          <TopNav
            heading={"Heritagecontest"}
            info={"Paticipants: 28"}
            onMenuClick={() => {
              setShowLeftNav(true);
              setBackdrop(true);
            }}
          ></TopNav>

          <div className="insideeventpage__posts">
            {isLoading && <Loading></Loading>}
            {priorityPosts.map((post) => (
              <Post
                splitAvatar={post.creatorAvatar}
                splitName={post.creatorName}
                date={post.createdAt}
                text={post.text}
                media={post.image}
                comments={''}
                likes={post.starCount}
                key={post.PostId}
                postId={post.PostId}
                eventId={params.eid}
                splitId={post.creator}
                userSplitId={splitid}
                userAvatar={split.avatar}
                userSplitName={split.name}
                onProfileClick={onProfileClick}
                commenticonClick={commenticonClick}
                onRecentPostId={onRecentPostId}
                stars={post.stars}
              ></Post>
            ))}
             {posts.map((post) => (
              <Post
                splitAvatar={post.creatorAvatar}
                splitName={post.creatorName}
                date={post.createdAt}
                text={post.text}
                media={post.image}
                comments={''}
                likes={post.starCount}
                key={post.PostId}
                postId={post.PostId}
                eventId={params.eid}
                splitId={post.creator}
                userSplitId={splitid}
                userAvatar={split.avatar}
                userSplitName={split.name}
                onProfileClick={onProfileClick}
                commenticonClick={commenticonClick}
                onRecentPostId={onRecentPostId}
                stars={post.stars}
              ></Post>
            ))}
          </div>
          <button
            onClick={() => {
              setPostModal(true);

              setBackdrop(true);
            }}
          >
            Create a Post
          </button>
        </div>

        <Breakpoint customQuery="(min-width: 1200px)">
          <RightNav></RightNav>
        </Breakpoint>
      </div>
    </BreakpointProvider>
  );
}

export default InsideEvent;
