import React from 'react';

const Header = ({ user, onProfileClick }) => {
  return (
    <div className="header">
      <div className="logo_tarangini">
        <img src="tarangini_logo.png" className="logo" alt="Tarangini Logo" />
      </div>
      {user && (
        <div className="profile-icon" onClick={onProfileClick}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="profile-image" />
          ) : (
            <div className="initials">{user.displayName ? user.displayName[0] : user.email[0]}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;