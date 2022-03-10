import React, { useState, useEffect } from "react";
import "../css/ChoosingPeopleModal.css";
import { CSSTransition } from "react-transition-group";
import girl from "../../../assets/Dummyimages/Girl4.jpg";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../../Firebase"

function ChoosingpeopleModal(props) {
  const [checkedState, setCheckedState] = useState(
    new Array(props.Choices.length).fill(false)
  );
  const [choices, setChoices] = useState([]);
 const [allParticipants,setAllParticipants]=useState([])
 const [currentMatches,setCurrentMatches]=useState([])
const [match,setMatch]=useState(false)
const [querys,setQuery]=useState("")

  const handleOnChange = (position) => {
    setQuery("")
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    const choicesArray = [];
    updatedCheckedState.forEach((choice, index) => {
      if (choice === true) {
        choicesArray.push(props.Choices[index]);
      }
    });
   // console.log(choicesArray)
    setChoices(choicesArray);
    // console.log(choicesArray)
  };

  // useEffect(()=>{

  // },[])



  useEffect(async ()=>{
    const participantArray=[]
    const q = query(collection(db, "Events", props.eventId, "Participants"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());
  // console.log(doc)
      participantArray.push({...doc.data(),id:doc.id})
    
});
setAllParticipants(participantArray)
//console.log(participantArray)
  },[])
 
useEffect(()=>{
let matches=[]
const matchedusers=[]
allParticipants.forEach((p)=>{

choices.forEach((choice)=>{
  if( p.choices.includes(choice)){
    console.log("dd",choice,p.id)
    matches.push(true)
  }
  else{
    matches.push(false)
  }
})
console.log(matches)
if(!matches.includes(false) && matches.includes(true) )
 {
     matchedusers.push(p)
 }

  matches=[]
})
setCurrentMatches(matchedusers)
console.log(matchedusers.length)
},[choices])



const searchFocusHandler=()=>{
  if(checkedState.includes(true)){
    setChoices([])
  }
setCheckedState(
  new Array(props.Choices.length).fill(false)
)

// if(choices !== []){
// setChoices([])
// }
// const  fileterdArray=  allParticipants.filter(post => {
//   if (querys === "") {
//     //if query is empty
//     return [];
//   } else if (post.name.toLowerCase().includes(querys.toLowerCase())) {
//     //returns filtered array
//     return post;
//   }
// });
// setCurrentMatches(fileterdArray)

}

 const onSearchHandler=(event)=>{
   event.preventDefault()
const  fileterdArray=  allParticipants.filter(post => {
    if (querys === "") {
      //if query is empty
      return [];
    } else if (post.name.toLowerCase().includes(querys.toLowerCase())) {
      //returns filtered array
      return post;
    }
  });
  setCurrentMatches(fileterdArray)

}

  return (
    <CSSTransition
      in={props.show}
      timeout={100}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <div className="choosingmodal">
        <div className="choosingmodal-heading">
          <p className="choosingmodal-heading-main">
            prioritize the pepole who see your post first
          </p>
          <p className="choosingmodal-heading-sub">
            sort the people on the basis of their choices or by thier name.the people you select
            here will see this post as a priority.
          </p>
        </div>
        <div className="choosingmodal-select">
          <div className="choosingmodal-choices">
            {props.Choices.map((choice, index) => (
              <div key={index} className="choosingmodal-choices-entry">
                <input 
                type="checkbox"
                value={choice}
                name={choice}
                id={index}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
                ></input>
                <label>{choice} </label>
              </div>
            ))}
          </div>
          <div className="choosingmodal-people">
            <form onSubmit={onSearchHandler}  className="choosingmodal-people-search">
              <input onFocus={searchFocusHandler} onChange={(e)=>{setQuery(e.target.value)}} value={querys}  type="text" placeholder="Or Search for a user By Name"></input>
            <button   onClick={onSearchHandler}>Search</button>
            </form>
            {
              currentMatches.map((c)=>
              <div key={c.id} className="choosingmodal-people-entry">
              <img src={c.avatar}></img>
              <div className="choosingmodal-people-entry-text">
                <p className="choosingmodal-people-entry-name">{c.name}</p>
                <p classsName="choosingmodal-people-entry-posts">
                  {" "}
                  2 posts in this event
                </p>
              </div>
              <input type="checkbox"></input>
            </div>

              )
            }
          
      {currentMatches.length===0 && <p>No such Users</p>}
           
          </div>
        </div>

        <button className="choosingmodal-button" type="button">
          Submit
        </button>
      </div>
    </CSSTransition>
  );
}

export default ChoosingpeopleModal;
