import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

function Account() {
    const location = useLocation();

    // Extract user data from location state
    const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;
  
    const [user, setUser] = useState(userData);
    const navigate=useNavigate();

    useEffect(() => {
      if (!userData) {
        // console.log(userData)
        navigate("/"); // Navigate to the home page if user data is null
      }
    }, [userData, navigate]);
  
    // Update user state when userData prop changes
    useEffect(() => {
      setUser(userData);
    }, [userData]);
    console.log(userData)
  return (
    <div style={{textAlign:'center',paddingTop:"35vh"}}>
    <div style={{color:"white"}}>
        Hi! This is your profile..
    </div>
    <div style={{color:"white"}}>
        I hope you LIKED It..!!
    </div>
    </div>
  );
}

export default Account;
