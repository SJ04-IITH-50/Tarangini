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
        <div style={{display:"flex",justifyContent:"center"}}>
        <img src="Solar_panels_image.png" className="solar_panels" alt="Solar_panels Image"/>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        {/* <img src="Battery_image.png" className="Battery" alt="Battery Image"/> */}
        <img src="home_image.png" className="home" alt="Home Image" />
        {/* <img src="grid-removebg-preview.png" className="grid" alt="Grid Image" /> */}
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <img src="Battery_image.png" className="Battery" alt="Battery Image"/>
        {/* <img src="home_image.png" className="home" alt="Home Image" /> */}
        <img src="grid-removebg-preview.png" className="grid" alt="Grid Image" />
        </div>
        <div className="centered-text">Development in Progress...</div>

    </>
  );
}

export default Home;
