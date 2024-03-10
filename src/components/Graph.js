import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

function Graph() {
    const location = useLocation();

    // Extract user data from location state
    const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;
  
    const [user, setUser] = useState(userData);
  
    // Update user state when userData prop changes
    useEffect(() => {
      setUser(userData);
    }, [userData]);
    console.log(userData)
  return (
    <div style={{color:"white"}}>
        Hi!
    </div>
  );
}

export default Graph;
