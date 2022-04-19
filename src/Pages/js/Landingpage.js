import React,{useState} from "react";
import "../css/LandingPage.css";
import Heroimg from "../../assets/websiteimages/Heroimg.svg";
import feature1 from "../../assets/websiteimages/features1.svg";
import feature2 from "../../assets/websiteimages/Feature2.svg";
import feature3 from "../../assets/websiteimages/features3.svg";
import signupstep from "../../assets/websiteimages/signupstep.svg";
import createyourprofile from "../../assets/websiteimages/createyouprofilestep.svg";
import joinevents from "../../assets/websiteimages/joineventstep.svg";
import createsplit from "../../assets/websiteimages/createsplitsstep.svg";
import connect from "../../assets/websiteimages/connectstep.svg";
import menu from "../../assets/websiteimages/menu.svg"
import { auth ,db} from "../../Firebase";

import { collection, addDoc,doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Landingpage() {
    const [login, setlogin] = useState(false)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    //const [user, setuser] = useState({})
    const Navigate=useNavigate()


    const Signuphandler = async (e ) => {
      e.preventDefault();
      if(password !== ConfirmPassword){
        console.log("password is not same as confirm password")
        setError('Confirm password is not same as passoword')
        return ;
      }

      
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            console.log(userCredential)
          
           try {
            await setDoc(doc(db, "users", userCredential.user.uid), {
              name: name,
             email:email
            });
            window.localStorage.setItem("SplitIsAuth",userCredential.user.uid )
            Navigate('/home')
           }catch(e){
             console.log("error while adding user to the database",e)
           }
  

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(error.message)
        
          // ..
        });

       
      
      setEmail("");
      setPassword("");
      setConfirmPassword("")
    
    };
    const Loginhandler = (e) => {
      e.preventDefault();
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          window.localStorage.setItem("SplitIsAuth",userCredential.user.uid )
          console.log("loggedin", userCredential.user);
          Navigate('/home')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
          setError(error.message)
        });
      
      setEmail("");
      setPassword("");
  
    };
  const onFormFocus=()=>{
    setError('')
  }
    const AuthClick= login ? Loginhandler : Signuphandler
  return (
    <div>
      <div className="nav">
        <div className="nav-logo">
          <p className="logo">Split</p>
        </div>
        <div className="nav-middle">
          <a href="">Features</a>
          <a href="">Steps</a>
          <a href="">About us</a>
        </div>
        <div className="nav-right">
          <a href="" className="btn-login">
            Login
          </a>
          <a href="" className="btn-signup">
            Signup
          </a>
          <img src={menu} className="menu-logo" />
        </div>
      </div>
      <div className="hero">
        <div className="hero-info">
          <p className="hero-heading">
            A new way of interacting with the world
          </p>
          <p className="hero-subheading">
            be whomever you want to be, interact with strangers,maintain
            multiple personalities.
          </p>
          <a href="" className="btn">
            Signup
          </a>
        </div>
        <div className="hero-img">
          <img src={Heroimg}></img>
        </div>
      </div>

      <div className="features">
        <p className="features-miniheading">IN A NUTSHELL</p>
        <p className="features-heading">All the features you need</p>
        <p className="features-des">
          Split completely changes the way you have been interacting online.
          providing a diffrent approch to meeting people while maintaining
          security privacy.
        </p>
        <div className="features-container">
          <div className="features-cards">
            <div className="feature-card">
              <div className="feature-img">
                <img src={feature1} />
              </div>
              <p className="feature-heading">
                Create and maintain many Splits{" "}
              </p>
              <p className="feature-des">
                A Split is an part of your personality which you create to
                highlight that part of yourself. you can create many splits to
                engage in diffrent events.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-img">
                <img src={feature2} />
              </div>
              <p className="feature-heading">Be Anonymous</p>
              <p className="feature-des">
                Being anonymous eleminates the need of showcasing . interact
                with strangers ,share your views.{" "}
              </p>
            </div>
            <div className="feature-card " id="feature3">
              <div className="feature-img">
                <img src={feature3} />
              </div>
              <p className="feature-heading" >Join Events</p>
              <p className="feature-des">
                join diffrent events according to your choice . interact with
                strangers who shares same intrests as you , meet amazing pepole.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="steps">
        <p className="steps-miniheading">The Split Process</p>
        <p className="steps-heading">Steps to use Split</p>
        <div className="steps-container">
          <div className="step">
            <img src={signupstep} />
            <div className="step-info">
              <p className="step-heading">Sigining up</p>
              <p className="step-des">
                To use Split you first have to sign up or login ( if you already
                have an account) than only you can proceed further.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-info">
              <p className="step-heading">Create your profile</p>
              <p className="step-des">
                You have to create your main profile , which will contain your
                real information and only you can see it.
              </p>
            </div>
            <img src={createyourprofile}></img>
          </div>
          <div className="step">
            <img src={joinevents} />
            <div className="step-info">
              <p className="step-heading">Join diffrent Events</p>
              <p className="step-des">
                you will be able to see many events ,you can join a event
                according to you intrests and share your views while being
                anonymous{" "}
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-info">
              <p className="step-heading">Create Splits</p>
              <p className="step-des">
                {" "}
                Splits are your anonymous ids. for joining diffrent event you
                have to create diffrent splits. create a split with traits
                respective to that event.
              </p>
            </div>
            <img src={createsplit}></img>
          </div>
          <div className="step" >
            <img src={connect} />
            <div className="step-info">
              <p className="step-heading">Connect with Strangers </p>
              <p className="step-des">
                Inside an event you can find many strangers with common intrests
                ,you can have a genuine conversation and exchange your views
                about the topic.
              </p>
            </div>
          </div>
        </div>
      </div>
    <div className="auth">
    <p className="auth-heading">{!login ?"Create your account" :"Login into your account"}</p>
          <div className="form-container">
          <form className="auth-form">
        {!login ? 
              <div className="auth-entries">
                
     <div className="auth-labels">
         <p className="auth-label">Email:</p>
         <p className="auth-label">Name:</p>
         <p className="auth-label">Password:</p>
         <p className="auth-label">Confirm Password:</p>

     </div>
     <div className="signup auth-inputs ">
       <input onFocus={onFormFocus} value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="rohan.2024cse1542@kiet.edu" className="auth-input" />
       <input onFocus={onFormFocus} value={name}  onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Rohan agarwal" className="auth-input" />
       <input onFocus={onFormFocus} value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="********" className="auth-input" />
       <input onFocus={onFormFocus} value={ConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="text" placeholder="********" className="auth-input" />
     </div>
     </div> : 
      <div className="auth-entries">
                
      <div className="auth-labels">
          <p className="auth-label">Email:</p>
         
          <p className="auth-label">Password:</p>
    
 
      </div>
      <div className=" login auth-inputs " id="login-inputs">
        <input onFocus={onFormFocus}  value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="rohan.2024cse1542@kiet.edu" className="auth-input " />
      
        <input onFocus={onFormFocus}  value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="********" className="auth-input" />
      
      </div>
      </div>  }
      <p className="auth-error">{error}</p>
     <button onClick={AuthClick} className="auth-button">{!login ?"Signup":"Login"}</button>
     <p  onClick={()=>{setlogin(prev=>!prev)}} className="auth-switch">{!login ? "Already have an account?switch to login":"Don't have an account?Create one"}</p>
          </form>
          </div>
    </div>
    <div className="footer">

    </div>
    </div>
  );
}

export default Landingpage;
