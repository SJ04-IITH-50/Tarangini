import React, { useState, useEffect } from "react";
import "./Home.css";
import { signInWithGooglePopup, signOutUser } from "./utils/firebase.utils";
import { useLocation, useNavigate } from "react-router-dom";
import DownwardArrow from "./components/Arrows/DownwardArrow";
import UpwardArrow from "./components/Arrows/UpwardArrow";
import {
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./utils/firebase.utils";

//To update the data of the user by Email
async function updateUserByEmail(email, newData) {
  try {
    const docRef = doc(db, "Users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, newData);
    } else {
      // Initialize data with all fields set to 0
      await setDoc(docRef, { ...newData, ...{ I_sp: 0, I_H: 0, I_G: 0,Notification:false } });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//To get the data from the BD by email
async function getUserByEmail(email) {
  try {
    const userDocRef = doc(db, "Users", email);

    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const user_data = docSnapshot.data();
      return user_data;
    } else {
      console.log("User not found.");
      updateUserByEmail(email);
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [Isp,setIsp]=useState(0);
  const [IH,setIH]=useState(0);
  const [IG,setIG]=useState(0);
  const [grid,setGrid]=useState(0);

  const userData =
    location.state && location.state.user
      ? JSON.parse(location.state.user)
      : null;
  // console.log(userData);
  // useEffect(() => {
  //   if (!userData) {
  //     // console.log(userData)
  //     navigate("/"); // Navigate to the home page if user data is null
  //   }
  // }, [userData, navigate]);

  // const user_data=getUserByEmail(userData.email)

  useEffect(() => {
    if (userData) {
      (async () => {
        const user_data = await getUserByEmail(userData.email);
        console.log(user_data);
        if (user_data) {
          const { I_sp, I_G } = user_data;
          const I_H = I_sp - I_G;
          console.log(I_sp);
          console.log(I_H);
          updateUserByEmail(userData.email, { I_H: I_H });
          setIG(I_G);
          setIsp(I_sp);
          setIH(I_H);
          setGrid(I_G);
          if(I_G<0){
            setIG((-1)*I_G)
            console.log(IG);
          }
        }
      })();
    } else {
      navigate("/"); // Navigate to the home page if user data is null
    }
  }, [userData, navigate]);

  // const [user, setUser] = useState(userData);
  // const [showLogout, setShowLogout] = useState(false);
  // const [confirmLogout, setConfirmLogout] = useState(false);

  // const handleLogout  = () => {
  //   if (confirmLogout) {
  //     signOutUser();
  //     setUser(null);
  //     setShowLogout(false);
  //     setConfirmLogout(false);
  //     navigate("/")
  //   } else {
  //     setConfirmLogout(true);
  //   }
  // };

  return (
    <div className="home-container">
      {/* <div className="logo_tarangini">
        <img src="tarangini_logo.png" className="logo" alt="Tarangini Logo" />
      </div>
      {user ? (
        <>
          <div className="profile-icon" onClick={() => setShowLogout(!showLogout)}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="profile-image" />
            ) : (
              <div className="initials">{user.displayName ? user.displayName[0] : user.email[0]}</div>
            )}
          </div>
          {showLogout && (
            <div className="logout-box">
              {confirmLogout ? (
                <div className="confirmation-message">
                  Are you sure you want to log out?
                  <button onClick={handleLogout}>Yes</button>
                  <button onClick={() => setConfirmLogout(false)}>No</button>
                </div>
              ) : (
                <button onClick={handleLogout}>Logout</button>
              )}
            </div>
          )}
        </>
      ) : (
        <button className="login" onClick={() => navigate("/login")}>Login</button>
      )} */}
      <div className="centered-text">Welcome to Tarangini</div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="Solar_panels_image.png"
          className="solar_panels"
          alt="Solar_panels Image"
        />
      </div>
      {userData && (
          <div className="centered-text">
            Current Produced: {Isp} units
          </div>
        )}

      {/* <div className="scroll-prompt">
        <div className="scroll-prompt-arrow-container">
          <div className="scroll-prompt-arrow"><div></div></div>
          <div className="scroll-prompt-arrow"><div></div></div>
        </div>
      </div> */}

      <DownwardArrow />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="home_image.png" className="home" alt="Home Image" />
      </div>
      {userData && (
          <div className="centered-text">
            Current Consumed: {IH} units
          </div>
        )}

      {/* <div className="scroll-prompt">
        <div className="scroll-prompt-arrow-container">
          <div className="scroll-prompt-arrow"><div></div></div>
          <div className="scroll-prompt-arrow"><div></div></div>
        </div>
      </div> */}

      {grid >= 0 ? <DownwardArrow /> : <UpwardArrow />}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="grid-removebg-preview.png"
          className="grid"
          alt="Grid Image"
        />
      </div>
      {grid >= 0 ?
          <div className="centered-text">
            Current to Grid: {IG} units
          </div>
      
         : <div className="centered-text">
         Current from Grid: {IG} units
       </div>}
      

      <div className="centered-text">Development in Progress...</div>
    </div>
  );
}

export default Home;
