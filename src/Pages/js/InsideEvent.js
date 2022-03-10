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
import { ref, push, set, onValue } from "firebase/database";


function InsideEvent() {
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showPostModal, setPostModal] = useState(false);
  const [showCommentModal, setCommentModal] = useState(false);
  const [showChooseModal,setChooseModal]=useState(true)
  const [showProfileDetail, setshowProfileDetail] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [splitid, setsplitid] = useState("");
  const [split, setSplit] = useState({
    name: "",
    avatar: "",
  });
  const [viewSplit, setViewSplit] = useState({
    name: "",
    bio: "",
    avatar: "",
    connections: "",
    id: "",
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
  };

  const setModal = (data) => {
    // setBackdrop(data);
    setPostModal(data);
    setCommentModal(data);
  };

  const setModalTrue=(data)=>{
    setChooseModal(true)
  }

  const commenticonClick = (postId, postCreatorName) => {
    setCommentingOnPostId(postId);
    setPostCreatorName(postCreatorName);

    setCommentModal(true);
    setBackdrop(true);
  };

  useEffect(async () => {
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
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, [splitid]);

  useEffect(() => {
    const postsRef = ref(database, "posts/" + `${params.eid}/`);
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        return;
      }
      const dataArray = Object.values(data);

      setPosts(dataArray);
      // updateStarCount(postElement, data);
    });
  }, [params.eid]);

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
          Choices={location.state.Choices}
          eventId={params.eid}
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
          show={showProfileDetail}
          name={viewSplit.name}
          avatar={viewSplit.avatar}
          connections={viewSplit.connections}
          bio={viewSplit.bio}
          viewSplitId={viewSplit.id}
          splitId={splitid}
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
            {posts.map((post) => (
              <Post
                splitAvatar={post.creatorAvatar}
                splitName={post.creatorName}
                date={post.createdAt}
                text={post.text}
                media={post.image}
                comments={0}
                likes={0}
                key={post.PostId}
                postId={post.PostId}
                eventId={params.eid}
                splitId={post.creator}
                userSplitId={splitid}
                userAvatar={split.avatar}
                userSplitName={split.name}
                onProfileClick={onProfileClick}
                commenticonClick={commenticonClick}
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
