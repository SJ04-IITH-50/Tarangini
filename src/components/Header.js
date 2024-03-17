import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { signInWithGooglePopup, signOutUser } from "../utils/firebase.utils";
import { useNavigate } from "react-router-dom";
import "./Header.css"
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SettingsIcon from '@mui/icons-material/Settings';
import GradeIcon from '@mui/icons-material/Grade';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';


import {
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase.utils";


//To get the data from the BD by email
async function getUserByEmail_Notf(email) {
  try {
    const userDocRef = doc(db, "Users", email);

    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const user_data = docSnapshot.data();
      // console.log(user_data.Notification)
      return user_data.Notification;
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notf,setNotf]=useState(false);
  const panelRef = useRef(null);
  const [isOpen, setOpen] = React.useState(false);


  // Extract user data from location state
  const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;

  const [user, setUser] = useState(userData);
  const [showLogout, setShowLogout] = useState(false);

  // Add event listener to close panel when clicking outside
  function handleClickOutside(event) {
    // console.log(panelRef.current && !panelRef.current.contains(event.target));
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setOpen(false);
      console.log("Got to hOme")
    }
    
  }

  // Update user state when userData prop changes
  useEffect(() => {
    setUser(userData);
    if(user){
      getUserByEmail_Notf(user.email)
        .then(user_data => {
          // console.log(user_data);
          setNotf(user_data);
          // console.log(notf);
        })
        .catch(error => {
          console.log(error);
        });
    }
    console.log(isOpen)

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userData]);
  


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      signOutUser();
      setUser(null);
      setShowLogout(false);
      navigate("/");
    }
    else{
      setShowLogout(false)
    }
  };
  

  const gotoHome = () =>{
    console.log("Going to Home!")
    navigate("/home", { state: { user: JSON.stringify(user) } });
    setOpen(false);
  };


  const handleNotification =()=>{
    if(notf==false){
      window.alert("There are no New Notifications..!")
      // navigate("/home", { state: { user: JSON.stringify(user) } });
  }
  else{
      window.alert("Please clean the Solar Panels..!")
      // navigate("/home", { state: { user: JSON.stringify(user) } });

  }
  };
  

  return (
    <div>
      <div className="logo_tarangini" onClick={gotoHome}>
        <img src="tarangini_logo.png" className="logo" alt="Tarangini Logo" />
      </div>
    
      {/* {user && (
        <div className="profile-icon" onClick={() => setShowLogout(!showLogout)}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="profile-image" />
          ) : (
            <div className="initials">{user.displayName ? user.displayName[0] : user.email[0]}</div>
          )}
        </div>
      )}
      {showLogout && (
            <div className="logoutbox">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )} */}


<div>
      <button
        onClick={() => setOpen(!isOpen)}
        className={`hamburger-button ${isOpen ? "open" : "close"}`}
      />
      <div ref={panelRef} className={`panel ${isOpen ? "open" : "close"}`}>
      {user && (
        <div className="profile-icon">
          {user.photoURL ? (
            <>
            <img src={user.photoURL} alt="Profile" className="profile-image" />
            {/* <p className="initial">{user.email}</p> */}
            </>
          ) : (
            <div className="initials">{user.displayName ? user.displayName[0] : user.email[0]}</div>
          )}
          {/* <div>{user.email}</div> */}
        </div>
      )}
      <div className="initial">{user.displayName}</div>
      <div className="initial">{user.email}</div>
      {/* <p className="initial">{user.email}</p> */}
        <ul>
          
          {notf==false ?
          <li onClick={handleNotification} className='icons' >
          <NotificationsIcon style={{paddingRight:"2px",height:"20px"}}/>
            <a >Notifications</a>
          </li> :
                <li onClick={handleNotification} className='icons' >
                <NotificationImportantIcon style={{paddingRight:"2px",height:"20px"}}/>
                <div id='dot'></div>
                  <a >Notifications</a>
                </li>}
          <li className='icons' onClick={gotoHome}>
            <InfoIcon style={{paddingRight:"2px",height:"20px"}}/>
            <a >About Us</a>
          </li>
          <li className='icons' onClick={gotoHome}>
            <PermContactCalendarIcon style={{paddingRight:"2px",height:"20px"}}/>
            <a>Contact Us</a>
          </li>
          <li className='icons' onClick={gotoHome}>
            <SettingsIcon style={{paddingRight:"2px",height:"20px"}}/>
            <a >Settings</a>
          </li>
          <li className='icons' onClick={gotoHome}>
            <GradeIcon style={{paddingRight:"2px",height:"20px"}}/>
            <a >Rate Us</a>
          </li>
          <li className='logout' onClick={handleLogout}>
            <LogoutIcon style={{paddingRight:"2px",height:"20px"}}/>
            <a>Log out</a>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Header;
