import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { signInWithGooglePopup, signOutUser } from "../utils/firebase.utils";
import { useNavigate } from "react-router-dom";
import "./Header.css"

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract user data from location state
  const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;

  const [user, setUser] = useState(userData);
  const [showLogout, setShowLogout] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  // Update user state when userData prop changes
  useEffect(() => {
    setUser(userData);
  }, [userData]);

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
    <>
      <div className="logo_tarangini">
        <img src="tarangini_logo.png" className="logo" alt="Tarangini Logo" />
      </div>
    
      {user && (
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
  );
}

export default Header;
