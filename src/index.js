import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Home';
import HomeBeforeLogin from './HomeBeforeLogin';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom';


const RootComponent = () => {

  return (
    <>
      <Router>
        
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
  