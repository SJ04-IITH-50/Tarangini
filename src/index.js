import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes,useLocation} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Home';
import HomeBeforeLogin from './HomeBeforeLogin';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';



const RootComponent = () => {

  const UserDataExtract = () => {
    const location = useLocation();
    const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;
    console.log(userData);
    return userData;
  };
  
  
  return (
    <>
      <Router>
        <Header userData={UserDataExtract}/>
        <Routes>
          <Route path="/" element={<HomeBeforeLogin/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);

serviceWorkerRegistration.unregister();
reportWebVitals();
  