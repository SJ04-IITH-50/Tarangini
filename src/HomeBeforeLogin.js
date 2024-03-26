import React, { useEffect, useState } from "react";
import './HomeBeforeLogin.css'
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "./utils/firebase.utils";


function HomeBeforeLogin() {
    useEffect(() => {
        var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };
        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];
        
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
        
            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        
            var that = this;
            var delta = 75;
        
            if (this.isDeleting) { delta /= 2; }
        
            if (!this.isDeleting && this.txt === fullTxt) {
                // Stop after typing the text once
                this.stopTyping();
                return;
            }
        
            setTimeout(function () {
                that.tick();
            }, delta);
        };
        
        TxtType.prototype.stopTyping = function () {
            // Do nothing if already stopped
            if (!this.isDeleting) return;
        
            // Set the text to the final state
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];
            this.el.innerHTML = '<span class="wrap">' + fullTxt + '</span>';
        };
        
        

        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    }, []);

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        setUser(response.user);
        console.log(response.user);
        // Pass user details to index.js while navigating
        navigate("/home", { state: { user: JSON.stringify(response.user) } });

    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="tarangini-logo-white.png" className="before_login_logo" alt="logo" />
            </div>
            <p style={{textAlign:"center", marginTop:"0px"}} >
                <a href="" className="typewrite" data-period="2000" data-type='["Tarangini"]'>
                    <span className="wrap"></span>
                </a>
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="login_button" onClick={logGoogleUser}>
                    Login
                </button>
            </div>
        </>
    );
};

export default HomeBeforeLogin;
