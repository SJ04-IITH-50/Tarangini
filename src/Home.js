import React from "react";
import "./Home.css";
import { signInWithGooglePopup } from "./utils/firebase.utils";

function Home() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <>
      <div className="logo_tarangini">
        <img src="tarangini_logo.png" className="logo" alt="Tarangini Logo" />
      </div>
      <button className="login" onClick={logGoogleUser}>Login</button>
        <div className="centered-text">Welcome to Tarangini</div>
        <div className="centered-text">Development in Progress...</div>
        <img src="grid-removebg-preview.png" className="gris" alt="Grid Image" />
    </>
  );
}

export default Home;
