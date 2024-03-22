import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase.utils";

async function getUserByEmail(email) {
  try {
    const userDocRef = doc(db, "Users", email);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const user_data = docSnapshot.data();
      return user_data.Month_G[10],user_data.Month_sp[10];
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

function Receipt() {
  const location = useLocation();
  const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;
  const [user, setUser] = useState(userData);
  const [month_consumed, setMonth] = useState(0);
  const [cgst, setCGST] = useState(0);
  const [sgst, setSGST] = useState(0);
  const [tp, setTP] = useState(0);
  const [tp_notax, setTPNoTax] = useState(0);
  const [paymentOption, setPaymentOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    setUser(userData);
    }
  }, [userData, navigate]);


  useEffect(() => {
    getUserByEmail(user.email)
      .then(user_data => {
        setMonth(user_data);
        // console.log(month_consumed)
      })
      .catch(error => {
        console.log(error);
      });
  }, [user.email]);
  // console.log(month_consumed[1])

  useEffect(() => {
    const cpu = 1.5;
    const tp_notax = cpu * month_consumed || 0;
    const cgst = 0.07 * tp_notax || 0;
    const sgst = 0.07 * tp_notax || 0;
    const tp = tp_notax + cgst + sgst || 0;

    setCGST(cgst.toFixed(2));
    setSGST(sgst.toFixed(2));
    setTP(tp.toFixed(2));
    setTPNoTax(tp_notax.toFixed(2));
  }, [month_consumed]);

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleProceedToPay = () => {
    // Proceed with the selected payment option
    console.log("Payment Option Selected:", paymentOption);
    // Add logic to proceed with payment
  };

  return (
    <>
    <div style={{ textAlign: 'center', color: "black", backgroundColor: "white", marginLeft: "10px", marginRight: "10px", border: "10px red", borderColor: "red", borderRadius: "5vw", fontSize: "large", marginTop: "3vh" }}>
      <div style={{ fontSize: "x-large", textAlign: 'center', color: "black", fontWeight: "bolder",paddingTop:"7vw" }}>
        Payment Information
      </div>
      <hr style={{ color: "red" }} />
      <div style={{ display: 'flex', justifyContent: 'center', color: "black",paddingBottom:"7vw" }}>

        <div style={{ marginRight: '8vw', textAlign: 'left' }}>
          <div>Total units Consumed:</div>
          <div>Cost per Unit:</div>
          <div>CGST (7%):</div>
          <div>SGST (7%):</div>
          <hr />
          <div>Total(including GST)</div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div>{month_consumed} KW</div>
          <div>1.5 rs/KW</div>
          <div>{cgst} rs</div>
          <div>{sgst} rs</div>
          <hr />
          <div>{tp} rs</div>
        </div>
      </div>
    </div>

      <div style={{ textAlign:"center",color: "white", paddingTop: "10px", paddingLeft: "10px", fontWeight: "bolder", fontSize: "x-large",paddingTop:"5vw",paddingTop:"1vh",paddingBottom:"1vh" }}> 
        Payment Options
      </div>
      <div style={{  color: "white",paddingTop:"10px" }}>
        <div style={{marginLeft:'5vw',marginRight:'5vw',borderRadius:'3px', marginBottom:"2vh",fontSize:"large",background: paymentOption=="UPI" ? "blue" : "grey",width:"90vw",paddingTop:"1vh",paddingBottom:"1vh"}}>
          <input type="radio" id="upi" name="paymentOption" value="UPI" onChange={handlePaymentOptionChange} />
          <label htmlFor="upi">Pay via UPI(PhonePe,GPay)</label>
        </div>
        <div style={{marginLeft:'5vw',marginRight:'5vw',borderRadius:'3px', marginBottom:"2vh",fontSize:"large",background: paymentOption=="CreditCard" ? "blue" : "grey",width:"90vw",paddingTop:"1vh",paddingBottom:"1vh"}}>
          <input type="radio" id="creditCard" name="paymentOption" value="CreditCard" onChange={handlePaymentOptionChange} />
          <label htmlFor="creditCard">Pay via Credit/Debit card</label>
        </div>
        <div style={{marginLeft:'5vw',marginRight:'10px',borderRadius:'3px',marginBottom:"2vh",fontSize:"large",background: paymentOption=="NetBanking" ? "blue" : "grey",width:"90vw",paddingTop:"1vh",paddingBottom:"1vh"}}>
          <input type="radio" id="netBanking" name="paymentOption" value="NetBanking" onChange={handlePaymentOptionChange} />
          <label htmlFor="netBanking">Net Banking</label>
        </div>
        <button onClick={handleProceedToPay} disabled={!paymentOption} style={{ marginTop: "10px", background: paymentOption ? "#4CAF50" : "#ccc", color: "white", padding: "14px 20px", fontSize: "16px", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.3s", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",width:"80vw",marginLeft:"10vw" }}>Proceed to Pay {tp} rs</button>
      </div>
    </>
  );
}

export default Receipt;
