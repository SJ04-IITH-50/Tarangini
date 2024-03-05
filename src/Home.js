import React from "react";
import "./Home.css";

function Home() {
  return (
    <>
    <div className="logo_tarangini">
        <img src="tarangini_logo.png" className="logo" alt="Tarangini Logo" />
      </div>
      <button className="login">Login</button>
    <div className="container">
      <div className="centered-text">Welcome to Tarangini</div>
      <div className="centered-text">Development in Progress...</div>
    </div>
    </>
  );
}

export default Home;
