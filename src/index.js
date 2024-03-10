import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Home';
import HomeBeforeLogin from './HomeBeforeLogin';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Bottomnav from './components/Bottomnav';

const RootComponent = () => {
  const [userData, setUserData] = useState(null);
  const UserDataExtract = () => {
    const location = useLocation();
    const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;
    // console.log(userData);
    setUserData(userData)
    return userData;
  };

const BottomnavWrapper = () => {
  const location = useLocation();
  return location.pathname !== "/" && <Bottomnav/>;
};
const HeaderWrapper = () => {
  const location = useLocation();
  return location.pathname !== "/" && <Header userData={UserDataExtract}/>;
};

  return (
    <>
      <Router>
        <HeaderWrapper/>
        <Routes>
          <Route path="/" element={<HomeBeforeLogin/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
        <BottomnavWrapper />
      </Router>
    </>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);

serviceWorkerRegistration.unregister();
reportWebVitals();