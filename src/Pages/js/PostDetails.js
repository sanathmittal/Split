import React, { useState, useEffect,useContext } from "react";
import RightNav from "../../Components/js/RightNav";
import LeftNav from "../../Components/js/LeftNav";
import TopNav from "../../Components/js/TopNav";
import Backdrop from "../../Reusable/js/Backdrop";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import { Breakpoint, BreakpointProvider } from "react-socks";
import girl1 from "../../assets/Dummyimages/Girl1.jpg";
import postimage from "../../assets/Dummyimages/postimage.jpg";
import Post from "../../Reusable/js/Post";
import Comment from "../../Reusable/js/Comment"
import ProfileDetailModal from "../../Components/Modals/js/ProfileDetailModal";
import { AuthContext } from "../../Context";
import CommentModal from "../../Components/Modals/js/CommentModal";
import { useNavigate, useParams ,useLocation} from "react-router-dom";
import { database, db } from "../../Firebase";
import { ref, push, set, onValue } from "firebase/database";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import "../css/PostDetails.css";

function PostDetails() {
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showBackdrop, setshowBackdrop] = useState(false);
  const [showCommentModal, setCommentModal] = useState(false);
  const [commentingonpostId ,setCommentingOnPostId]=useState("")
  const [postCreatorName,setPostCreatorName]=useState("")
  const [showProfileDetail, setshowProfileDetail] = useState(false);
  const [viewSplit, setViewSplit] = useState({
    name: "",
    bio: "",
    avatar: "",
    connections: "",
    choices:[],
    id: "",
  });
  const [comments, setComments] = useState([]);

  const [post, setPost] = useState({
    name: "",
    avatar: "",
    date: "",
    text: "",
    image: "",
    postId: "",
    splitId: "",
  });

  const params = useParams();
 const Location=useLocation()
const auth=useContext(AuthContext)

  const onBackdropClick = () => {
    setCommentModal(false);
    setShowLeftNav(false);
    setshowProfileDetail(false);
    setshowBackdrop(false);
  };

  const setModal = (data) => {
      setshowBackdrop(data);
      setCommentModal(data)
    };

    const commenticonClick=(postId,postCreatorName)=>{

      setCommentingOnPostId(postId)
      setPostCreatorName(postCreatorName)

        setCommentModal(true)
        setshowBackdrop(true)
      }

  const onProfileClick = async (data) => {
    const docRef = doc(db, "Events", params.eid, "Participants", data);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setViewSplit({
        name: docSnap.data().name,
        avatar: docSnap.data().avatar,
        bio: docSnap.data().bio,
        connections: "0",
        choices:docSnap.data().avatar.choices,
        id: data,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    setshowProfileDetail(true);
    setshowBackdrop(true);
  };

  useEffect(() => {
    const postsRef = ref(
      database,
      "Comments/" + `${params.eid}/` + `${params.pid}/`
    );
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        return;
      }
      const dataArray = Object.values(data);

      setComments(dataArray);
      // updateStarCount(postElement, data);
    });
  }, [params.eid]);

  useEffect(() => {
    const postsRef = ref(
      database,
      "posts/" + `${params.eid}/` + `${params.pid}`
    );
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();

      if (data === null) {
        return;
      }

      setPost({
        name: snapshot.val().creatorName,
        avatar: snapshot.val().creatorAvatar,
        date: snapshot.val().createdAt,
        text: snapshot.val().text,
        image: snapshot.val().image,
        postId: snapshot.val().PostId,
        splitId: snapshot.val().creator,
        starCount: snapshot.val().starCount
      });

      // updateStarCount(postElement, data);
    });
    
  }, [params.eid, params.pid]);



  return (
    <BreakpointProvider>
      <div className="postdetailspage__container">
        {showBackdrop && <Backdrop onClick={onBackdropClick}></Backdrop>}
        <Breakpoint customQuery="(min-width: 1200px)">
          <LeftNav></LeftNav>
        </Breakpoint>
        <LeftNavMobile show={showLeftNav}></LeftNavMobile>
        <CommentModal
          splitId={Location.state.userSplitId}
          userId={auth.uid}
          splitName={Location.state.userSplitName}
          postCreatorName={postCreatorName}
         postId={commentingonpostId}
          splitAvatar={Location.state.userAvatar}
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
          Choices={viewSplit.choices}
          //splitId={Location.state.userSplitId}
        ></ProfileDetailModal>
        <div className="postdetailspage">
          <div className="postdetailspage__comments-container">
            <Post
              splitAvatar={post.avatar}
              splitName={post.name}
              date={post.date}
              text={post.text}
              media={post.image}
              comments={"0"}
              likes={post.starCount}
              eventId={params.eid}
              splitId={post.splitId}
              postId={post.postId}
              onProfileClick={onProfileClick}
              commenticonClick={commenticonClick}
            ></Post>
            <div className="postdetailspage__comments">
              {comments.map((comment) => (
                <Comment
                  splitName={comment.creatorName}
                  splitAvatar={comment.creatorAvatar}
                  date={comment.createdAt}
                  text={comment.text}
                  comments={0}
                  likes={comment.starCount}
                  media={comment.image}
                  key={comment.PostId}
                  postId={comment.PostId}
                  parentPostId={params.pid}
                  eventId={params.eid}
                  splitId={comment.creator}
                  onProfileClick={onProfileClick}
                ></Comment>
              ))}
              {comments.length === 0 && (
                <p className="postdetailspage__nocomments"> No Comments yet</p>
              )}
            </div>
          </div>
          <TopNav
            heading={"Post"}
            onMenuClick={() => {
              setShowLeftNav(true);
            }}
          ></TopNav>
        </div>

        <Breakpoint customQuery="(min-width: 1200px)">
          <RightNav></RightNav>
        </Breakpoint>
      </div>
    </BreakpointProvider>
  );
}

export default PostDetails;
