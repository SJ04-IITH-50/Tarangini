import React, { useState } from "react";
import "./Home.css";
import { signInWithGooglePopup, signOutUser } from "./utils/firebase.utils";

function Home() {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    setUser(response.user);
  };

  const handleLogout = () => {
    if (confirmLogout) {
      signOutUser();
      setUser(null);
      setShowLogout(false);
      setConfirmLogout(false);
    } else {
      setConfirmLogout(true);
    }
  };

  return (
    <div className="home-container">
      {user && (
        <div
          className="profile-icon top-right"
          onClick={() => setShowLogout(!showLogout)}
        >
          {/* Display profile icon or user's email initial */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="initials">
              {user.displayName ? user.displayName[0] : user.email[0]}
            </div>
          )}
        </div>
      )}
      <div className="logo_tarangini">
        <img
          src="tarangini_logo.png"
          className="logo"
          alt="Tarangini Logo"
        />
      </div>
      {user ? (
        <>
          <div
            className="profile-icon"
            onClick={() => setShowLogout(!showLogout)}
          >
            {/* Display profile icon or user's email initial */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <div className="initials">
                {user.displayName ? user.displayName[0] : user.email[0]}
              </div>
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
        <button className="login" onClick={logGoogleUser}>
          Login
        </button>
      )}
      <div className="centered-text">Welcome to Tarangini</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="Solar_panels_image.png" className="solar_panels" alt="Solar_panels Image" />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <img src="Battery_image.png" className="Battery" alt="Battery Image"/> */}
        <img src="home_image.png" className="home" alt="Home Image" />
        {/* <img src="grid-removebg-preview.png" className="grid" alt="Grid Image" /> */}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="Battery_image.png" className="Battery" alt="Battery Image" />
        {/* <img src="home_image.png" className="home" alt="Home Image" /> */}
        <img src="grid-removebg-preview.png" className="grid" alt="Grid Image" />
      </div>
      <div className="centered-text">Development in Progress...</div>
    </div>
  );
}

export default Home;





