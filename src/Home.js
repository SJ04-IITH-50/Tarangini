import React, { useState, useEffect } from "react";
import "./Home.css";
import { signInWithGooglePopup, signOutUser } from "./utils/firebase.utils";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;

  useEffect(() => {
    if (!userData) {
      navigate("/"); // Navigate to the home page if user data is null
    }
  }, [userData, navigate]);

  const [user, setUser] = useState(userData);
  const [showLogout, setShowLogout] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    if (confirmLogout) {
      signOutUser();
      setUser(null);
      setShowLogout(false);
      setConfirmLogout(false);
      navigate("/")
    } else {
      setConfirmLogout(true);
    }
  };

  return (
    <div className="home-container">
      {user && (
        <div className="profile-icon top-right" onClick={() => setShowLogout(!showLogout)}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="profile-image" />
          ) : (
            <div className="initials">{user.displayName ? user.displayName[0] : user.email[0]}</div>
          )}
        </div>
      )}
      <div className="logo_tarangini">
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
      )}
      <div className="centered-text">Welcome to Tarangini</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="Solar_panels_image.png" className="solar_panels" alt="Solar_panels Image" />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="home_image.png" className="home" alt="Home Image" />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="grid-removebg-preview.png" className="grid" alt="Grid Image" />
      </div>
      <div className="centered-text">Development in Progress...</div>
    </div>
  );
}

export default Home;
