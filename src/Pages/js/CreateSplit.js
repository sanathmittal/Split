import React, { useState, useEffect, useContext } from "react";
import RightNav from "../../Components/js/RightNav";
import LeftNav from "../../Components/js/LeftNav";
import TopNav from "../../Components/js/TopNav";
import Backdrop from "../../Reusable/js/Backdrop";
import LeftNavMobile from "../../Components/js/LeftNavMobile";
import { Breakpoint, BreakpointProvider } from "react-socks";
import girl5 from "../../assets/Dummyimages/Girl8.jpg";
import downarrow from "../../assets/websiteimages/downarrow.svg";
import Avatar from "@material-ui/core/Avatar";
import AvatarDropdown from "../../Components/js/AvatarDropdown";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../../Context";
import { db } from "../../Firebase";
import "../css/CreateSplit.css";

function CreateSplit(props) {
  const Location = useLocation();
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [avatar, setavatar] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState();
  const [checkedState, setCheckedState] = useState(
    new Array(Location.state.Choices.length).fill(false)
  );
  const [choices, setChoices] = useState([]);
  // useEffect(() => {
  //   console.log(checkedState);
  //   //.log(choices)
  // }, [checkedState]);
  const handleOnChange = (position) => {
   

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    const choicesArray=[]
    updatedCheckedState.forEach((choice ,index)=>{
      if(choice ===true){
      choicesArray.push(Location.state.Choices[index])
      }
    })
   setChoices(choicesArray)
 // console.log(choicesArray)
  }

  const auth = useContext(AuthContext);

  const eventId = useParams();
  const Navigate = useNavigate();


  const passavatar = (data) => {
    setavatar(data);
  };
// const nochoices=()=>{
//   console.log(choices)
//    if (choices.length !== 3){
//      console.log("error")
//    }
//   //  else{
//   //    console.log("error")
//   //  }
// }
  const onFormSubmit = async (e) => {

    e.preventDefault();

    if (name.length === 0) {
      setError("name can not be empty");
      return;
    }
    if (bio.length < 12) {
      setError("Bio is too short");
      return;
    }
    if (choices.length !== 3){
          setError("you must have 3 choices")
          return;
         }
    if (!checked) {
      setError("you must agree to user guidelines");
      return;
    }
    try {
      const docRef = await addDoc(
        collection(db, "Events", eventId.eid, "Participants"),
        {
          name: name,
          bio: bio,
          user: auth.uid,
          avatar: avatar,
          JoinedOn: new Date(),
          choices: choices,
        }
      );

      await setDoc(doc(db, "users", auth.uid, "Splits", docRef.id), {
        name: name,
        bio: bio,
        event: eventId.eid,
        eventName: eventId.ename,
        avatar: avatar,
        CreatedOn: new Date(),
        connections: [],
        choices: choices,
      });
      const washingtonRef = doc(db, "users", auth.uid);

      await updateDoc(washingtonRef, {
        Events: arrayUnion(eventId.eid),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      setError("error while creating Split");
    }

    setName("");
    setBio("");
    setChecked();
    setavatar("");
    Navigate(`/event/${eventId.eid}`);
  };

  return (
    <BreakpointProvider>
      <div className="createsplitpage__container">
        {showLeftNav && (
          <Backdrop
            onClick={() => {
              setShowLeftNav(false);
            }}
          ></Backdrop>
        )}
        <Breakpoint customQuery="(min-width: 1200px)">
          <LeftNav></LeftNav>
        </Breakpoint>
        <LeftNavMobile show={showLeftNav}></LeftNavMobile>
        <div className="createsplitpage">
          <TopNav
            heading={"Create a split"}
            onMenuClick={() => {
              setShowLeftNav(true);
            }}
          ></TopNav>

          <p className="createsplitpage__heading">Create a Split</p>
          <form className="createsplitpage__form">
            <div className="createsplitpage__form-avatar">
              {/* <img src={girl5}></img> */}
              <Avatar
                style={{ margin: -7, height: 70, width: 70 }}
                alt="GeeksforGeeks Pic 1"
                src={avatar}
              />
              <div className="createsplitpage__form-avatardropdown">
                <img
                  onClick={() => {
                    setShowAvatarDropdown((prev) => !prev);
                  }}
                  src={downarrow}
                ></img>

                {showAvatarDropdown && (
                  <AvatarDropdown
                    eventId={eventId.eid}
                    passavatar={passavatar}
                  ></AvatarDropdown>
                )}

                <p>Select a avatar</p>
              </div>
            </div>
            <div className="createsplitpage__form-entry">
              <p>Name:</p>
              <div className="createsplitpage__form-entry-input">
                <input
                  onFocus={() => {
                    setError(null);
                  }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  type="text"
                ></input>
                <p>
                  your split willl be known by this name and you will interact
                  in this event using this name only ,select a name which suits
                  the identity and character of split you are creating.
                </p>
              </div>
            </div>
            <div className="createsplitpage__form-entry bio">
              <p>Bio:</p>
              <div className="createsplitpage__form-entry-input">
                <textarea
                  onFocus={() => {
                    setError(null);
                  }}
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  placeholder="Bio"
                  type="text"
                ></textarea>
                <p>
                  Describe your split here ,you can highlight your achivements
                  regarding the topic of this event . provide information about
                  your character so that others will get a basic idea of your
                  personality,and your knowledge about this event.
                </p>
              </div>
            </div>
            <div className="createsplitpage__form-points ">
              <p className="createsplitpage__form-points-heading">
                choose any 3 choices from below
              </p>
              <p className="createsplitpage__form-points-subheading">
                this is very important step as the choices you make will affect
                the posts you see inside the event.choose what you really feel
                describes you.
              </p>

              {Location.state.Choices.map((choice, index) => (
                <div key={index} className="createsplitpage__form-points-entry">
                  <input
                    type="checkbox"
                    value={choice}
                    name={choice}
                    id={index}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  ></input>
                  <label>{choice}</label>
                </div>
              ))}
            
            </div>
            <div className="createsplitpage__form-checkbox">
              <input
                onFocus={() => {
                  setError(null);
                }}
                type="checkbox"
                value={checked}
                onClick={(e) => {
                  setChecked(e.target.checked);
                }}
              ></input>
              <p>
                I have read the event’s user guidelines and i agree with all of
                them. i further give my consent for action against my account if
                found guilty of inapproriate behaviour.{" "}
              </p>
            </div>
            <p className="createsplit-error">{error}</p>
            <button onClick={onFormSubmit}>Join</button>
          </form>
        </div>

        <Breakpoint customQuery="(min-width: 1200px)">
          <RightNav></RightNav>
        </Breakpoint>
      </div>
    </BreakpointProvider>
  );
}

export default CreateSplit;
