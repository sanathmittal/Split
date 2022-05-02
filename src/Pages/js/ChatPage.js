import React, { useState, useContext, useEffect, useRef } from "react";
import RightNav from "../../Components/js/RightNav";
import LeftNav from "../../Components/js/LeftNav";
import TopNav from "../../Components/js/TopNav";
import Backdrop from "../../Reusable/js/Backdrop";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import { Breakpoint, BreakpointProvider } from "react-socks";
import "../css/ChatPage.css";
import Image from "../../Reusable/js/Image";
import girl4 from "../../assets/Dummyimages/eventimage.jpg";
import girl from "../../assets/Dummyimages/profileimage.jpg";
import arrowBack from "../../assets/websiteimages/arrowleft.svg";
import downarrow from "../../assets/websiteimages/downarrow.svg";
import menu from "../../assets/websiteimages/menu.svg";
import ChatCard from "../../Reusable/js/ChatCard";
import { collection, getDocs } from "firebase/firestore";
import { ref, onValue, set, remove } from "firebase/database";
import { db, database } from "../../Firebase";
import { AuthContext } from "../../Context";
import ChatForm from "../../Components/js/ChatForm";
import Message from "../../Reusable/js/Message";

import { CollectionsOutlined } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import ImagePreview from "../../Components/js/ImagePreview";

function ChatPage() {
  const Navigate = useNavigate();

  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showSplitDropdown, setshowSplitDropdown] = useState(false);
  const [userSplits, setUserSplits] = useState([]);
  const [text, setText] = useState("");
  const [showchatArea,setShowChatarea]=useState(false)
  const [currentSplit, setCurrentSplit] = useState({
    name: "",
    avatar: "",
    id: "",
    connections: [],
  });
  const [currentConnection, setcurrentConnection] = useState({
    name: "",
    avatar: "",
    id: "",
  });
  const auth = useContext(AuthContext);


  useEffect(() => {
    if (!window.localStorage.getItem("currentChatSplitId")) {
      return;
    }
    const rawinitailSplit = window.localStorage.getItem("currentChatSplitId");
    const initailSplit = JSON.parse(rawinitailSplit);
    const initailConection = JSON.parse(
      window.localStorage.getItem("currentChatConnectionId")
    );
    setCurrentSplit({
      name: initailSplit.name,
      avatar: initailSplit.avatar,
      id: initailSplit.id,
      connections: initailSplit.connections,
    });
    setcurrentConnection({
      name: initailConection.name,
      avatar: initailConection.avatar,
      id: initailConection.id,
    });
  }, []);

  useEffect(() => {
    const sjson = JSON.stringify(currentSplit);
    window.localStorage.setItem("currentChatSplitId", sjson);

    const cjson = JSON.stringify(currentConnection);
    window.localStorage.setItem("currentChatConnectionId", cjson);
  }, [currentConnection, currentSplit]);

  useEffect(async () => {
    const splits = [];

    const q = collection(db, "users", auth.uid, "Splits");

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.data())

      //   console.log(doc.id, " => ", doc.data());
      const data = doc.data();

      splits.push({ ...data, splitId: doc.id });
    });

    //     setSplits(splits);
    //   console.log("sasa",auth.usersplits)
    // console.log("shhs");
    setUserSplits(splits);
  }, [auth.uid]);
  useEffect(() => {
    // console.log(currentConnection.id)
  }, [currentConnection]);

  //*****************  fetching Chats  ****************//

  const [result, setresult] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentSplit.id === "") {
      return;
    }
    if (currentConnection.id === "") {
      return;
    }

    setresult(currentSplit.id.localeCompare(currentConnection.id));

    //console.log(result)
  }, [currentConnection.id, currentSplit.id]);

  useEffect(() => {
    if (result === null) {
      return;
    }
    // if(currentConnection.id === ""){
    //   setMessages([])
    // }

    if (result === 1) {
      const chatid = currentSplit.id + "," + currentConnection.id + "/";
      const chatsRef = ref(database, "Chatrooms/" + chatid);

      onValue(chatsRef, (snapshot) => {
        const data = snapshot.val();

        if (data === null) {
          setMessages([]);
          return;
        }

        const dataArray = Object.values(data);
        if (dataArray.length === 0) {
          return;
        }
        setMessages(dataArray);
      });
    }
    if (result === -1) {
      const chatid = currentConnection.id + "," + currentSplit.id + "/";
      const postsRef = ref(database, "Chatrooms/" + chatid);
      onValue(postsRef, (snapshot) => {
        const data = snapshot.val();

        if (data === null) {
          setMessages([]);
          return;
        }

        const dataArray = Object.values(data);
        if (dataArray.length === 0) {
          return;
        }
        setMessages(dataArray);
        console.log(dataArray);
        // updateStarCount(postElement, data);
      });
    }

    // console.log(messages)
  }, [currentConnection.id, currentSplit.id, result]);

  //******to delete a messgae****** */

  const DeleteMessage = (key) => {
    console.log(key);
    if (result === 1) {
      const chatsRef = ref(
        database,
        "Chatrooms/" + currentSplit.id + "," + currentConnection.id + "/" + key
      );
      remove(chatsRef);
    }
    if (result === -1) {
      const chatsRef = ref(
        database,
        "Chatrooms/" + currentConnection.id + "," + currentSplit.id + "/" + key
      );
      remove(chatsRef);
    }
  };

  //****to load page from bottom*****/

  const messagesEndRef = useRef(null);
  const messageDivRef = useRef(null);

  const scrollToBottom = () => {
    // if( messageDivRef.current.scrollHeight >800){
    // return;
    // }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <BreakpointProvider>
      <div className="chatpage__container">
        {showLeftNav && (
          <Backdrop
            onClick={() => {
              setShowLeftNav(false);
            }}
          ></Backdrop>
        )}

        {/* <Breakpoint customQuery="(min-width: 1200px)"> */}
        <div className={`chatpage__connections ${showchatArea  && 'display-none'}`} >
  
          <div className="chatpage__topnav">
            <div className="chatpage__topnav-top">
              <img
                onClick={() => {
                  setShowLeftNav(true);
                }}
                src={menu}
              ></img>
              <img
                className="chatpage__topnav-top-profileimg"
                src={girl}
                onClick={() => Navigate(`/profile/${auth.uid}`)}
              ></img>
            </div>
            <div className="chatpage__topnav-bottom">
              <img src={arrowBack}></img>
              <div className="chatpage__topnav-split">
                <img src={currentSplit.avatar}></img>
                <p>{currentSplit.name}</p>
                <img
                  className="chatpage__topnav-bottom-dropdownicon"
                  src={downarrow}
                  onClick={() => {
                    setshowSplitDropdown((prev) => !prev);
                  }}

                  // className="chatpage__topnav-dropdownicon"
                ></img>
                {showSplitDropdown && (
                  <div className="chatpage__splitdropdown">
                    {userSplits.map((split) => (
                      <div
                        key={split.splitId}
                        className="chatpage__splitdropdown-split"
                        onClick={() => {
                          setCurrentSplit({
                            avatar: split.avatar,
                            name: split.name,
                            id: split.splitId,
                            connections: split.connections,
                          });
                          setshowSplitDropdown(false);
                          setcurrentConnection({
                            id: "",
                            name: "",
                            avatar: "",
                          });
                        }}
                      >
                        <img src={split.avatar}></img>
                        <p>{split.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {currentSplit.connections.map((connection) => (
            <ChatCard
              name={connection.name}
              avatar={connection.avatar}
              key={connection.splitId}
              onClick={() => {
                setcurrentConnection({
                  name: connection.name,
                  avatar: connection.avatar,
                  id: connection.splitId,
                });
                setShowChatarea(true)
              }}
              currentConnectionid={currentConnection.id}
              id={connection.splitId}
            ></ChatCard>
          ))}
         
          {/* <button onClick={()=>{console.log(messages,currentConnection.name,currentSplit.name,result)}}>Messages</button> */}
          {currentSplit.connections.length === 0 && (
            <p className="chatpage-noconnectionmessage">
              {" "}
              This Split has no connections
            </p>
          )}
        </div>
        {/* </Breakpoint> */}
        <LeftNavMobile show={showLeftNav}></LeftNavMobile>
        <div ref={messageDivRef} className={`chatarea ${!showchatArea && 'display-none'}` }>
          <div className="chatarea-topNav">
            <img className="chatarea-backarrow" src={arrowBack} onClick={()=>{setShowChatarea(false)}}></img>
            <img src={currentConnection.avatar}></img>
            <p>{currentConnection.name}</p>
          </div>
          {messages.map((message) => (
            <Message
              onDeleteMessage={DeleteMessage}
              key={message.messageId}
              senderId={message.Sender}
              messageId={message.messageId}
              currentSplitId={currentSplit.id}
            >
              {message.text}
            </Message>
          ))}
          {/* <Image src={girl4} ></Image> */}

          <div ref={messagesEndRef} />
          <ChatForm
            currentSplitId={currentSplit.id}
            currentConnectionId={currentConnection.id}
          ></ChatForm>
        </div>
        {/* <ImagePreview></ImagePreview>  */}

        {/* <Breakpoint customQuery="(min-width: 1200px)">
            <RightNav></RightNav>
            </Breakpoint> */}
      </div>
    </BreakpointProvider>
  );
}

export default ChatPage;
