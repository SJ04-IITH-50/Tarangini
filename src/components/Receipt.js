import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase.utils";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

async function getUserByEmail(email) {
  try {
    const userDocRef = doc(db, "Users", email);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const user_data = docSnapshot.data();
      return user_data.Month_G[10], user_data.Month_sp[10];
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
  const userData =
    location.state && location.state.user
      ? JSON.parse(location.state.user)
      : null;
  const [user, setUser] = useState(userData);
  const [month_consumed, setMonth] = useState(0);
  const [cgst, setCGST] = useState(0);
  const [sgst, setSGST] = useState(0);
  const [tp, setTP] = useState(0);
  const [tp_net, setTPNet] = useState(0);
  const [paymentOption, setPaymentOption] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!userData) {
      navigate("/");
      setUser(userData);
    }
  }, [userData, navigate]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    height: "50vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    getUserByEmail(user.email)
      .then((user_data) => {
        setMonth(user_data);
        // console.log(month_consumed)
      })
      .catch((error) => {
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
    const tp_net = tp + 57 || 0;

    setCGST(cgst.toFixed(2));
    setSGST(sgst.toFixed(2));
    setTP(tp.toFixed(2));
    setTPNet(tp_net.toFixed(2));
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
      {/* <div style={{ textAlign: 'center', color: "black", backgroundColor: "white", marginLeft: "10px", marginRight: "10px", border: "10px red", borderColor: "red", borderRadius: "5vw", fontSize: "large", marginTop: "3vh" }}>
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
    </div> */}
      <div
        style={{
          textAlign: "center",
          color: "black",
          backgroundColor: "white",
          marginLeft: "10px",
          marginRight: "10px",
          border: "10px red",
          borderColor: "red",
          borderRadius: "5vw",
          fontSize: "large",
          marginTop: "3vh",
        }}
      >
        <div
          style={{
            fontSize: "x-large",
            textAlign: "center",
            color: "black",
            fontWeight: "bolder",
            paddingTop: "7vw",
          }}
        >
          Billing
        </div>
        <hr style={{ color: "red" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "black",
            paddingBottom: "7vw",
          }}
        >
          <div style={{ marginRight: "8vw", textAlign: "left" }}>
            <div>Total units Consumed:</div>
            {/* <div>Cost per Unit:</div>
          <div>CGST (7%):</div>
          <div>SGST (7%):</div> */}
            <hr />
            <div>Net Total</div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div>{month_consumed} kW</div>
            {/* <div>1.5 rs/KW</div>
          <div>{cgst} rs</div>
          <div>{sgst} rs</div> */}
            <hr />
            <div style={{ display: "flex", justifyContent: "center" }}>
              {tp_net} Rs{" "}
              <InfoOutlinedIcon
                onClick={handleOpen}
                style={{ width: "20px", paddingLeft: "2px" }}
              />
            </div>
            
            <Modal
              style={{borderColor:"black", borderRadius:"5%"}}
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} style={{borderColor:"black", borderRadius:"3%"}} >
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  <div
                    style={{
                      fontSize: "large",
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bolder",
                    }}
                  >
                    Tarangini
                  </div>
                  <hr style={{ color: "red" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "black",
                      fontSize: "medium",

                    }}
                  >
                    <div style={{ textAlign: "left", marginRight: "15px", }}>
                      <div>Units:</div>
                      <div>Cost per Unit:</div>
                      <div>CGST (7%):</div>
                      <div>SGST (7%):</div>
                      <hr />
                      <div>Total</div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div>{month_consumed} kW</div>
                      <div>1.5 Rs/kW</div>
                      <div>{cgst} Rs</div>
                      <div>{sgst} Rs</div>
                      <hr />
                      <div>{tp} Rs</div>
                    </div>
                  </div>

                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  <div
                    style={{
                      fontSize: "large",
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bolder",
                      paddingTop: "15px"
                    }}
                  >
                    DISCOM
                  </div>
                  <hr style={{ color: "red" }} />
                  <Button variant="outlined">APPCSDL</Button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "black",
                      fontSize: "medium",
                      paddingTop:"1vh",
                    }}
                  >
                    <div style={{ textAlign: "left", marginRight: "15px", }}>
                      <div>Total</div>
                    </div>
                    <div style={{ textAlign: "left" }}>

                      <div>57 Rs</div>
                    </div>
                  </div>
                  {/* <Button variant="contained" color="success" style={{marginTop:"15px"}}>Total:- {tp_net} rs</Button> */}

                </div>

              </Box>
            </Modal>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          color: "white",
          paddingTop: "10px",
          paddingLeft: "10px",
          fontWeight: "bolder",
          fontSize: "x-large",
          paddingTop: "5vw",
          paddingTop: "3vh",
          paddingBottom: "1vh",
        }}
      >
        Payment Options
      </div>
      <div style={{ color: "white", paddingTop: "10px" }}>
        <div
          style={{
            marginLeft: "5vw",
            marginRight: "5vw",
            borderRadius: "3px",
            marginBottom: "2vh",
            fontSize: "large",
            background: paymentOption == "UPI" ? "grey" : "white",
            color:paymentOption == "UPI" ? "white" : "black",
            width: "90vw",
            paddingTop: "1vh",
            paddingBottom: "1vh",
          }}
        >
          <input
            type="radio"
            id="upi"
            name="paymentOption"
            value="UPI"
            onChange={handlePaymentOptionChange}
          />
          <label htmlFor="upi" style={{paddingLeft:"1%"}}>Pay via UPI(PhonePe,GPay)</label>
        </div>
        <div
          style={{
            marginLeft: "5vw",
            marginRight: "5vw",
            borderRadius: "3px",
            marginBottom: "2vh",
            fontSize: "large",
            background: paymentOption == "CreditCard" ? "grey" : "white",
            color:paymentOption == "CreditCard" ? "white" : "black",
            width: "90vw",
            paddingTop: "1vh",
            paddingBottom: "1vh",
          }}
        >
          <input
            type="radio"
            id="creditCard"
            name="paymentOption"
            value="CreditCard"
            onChange={handlePaymentOptionChange}
          />
          <label htmlFor="creditCard" style={{paddingLeft:"1%"}}>Pay via Credit/Debit card</label>
        </div>
        <div
          style={{
            marginLeft: "5vw",
            marginRight: "10px",
            borderRadius: "3px",
            marginBottom: "2vh",
            fontSize: "large",
            background: paymentOption == "NetBanking" ? "grey" : "white",
            color:paymentOption == "NetBanking" ? "white" : "black",
            width: "90vw",
            paddingTop: "1vh",
            paddingBottom: "1vh",
          }}
        >
          <input
            type="radio"
            id="netBanking"
            name="paymentOption"
            value="NetBanking"
            onChange={handlePaymentOptionChange}
          />
          <label htmlFor="netBanking" style={{paddingLeft:"1%"}}>Net Banking</label>
        </div>
        <button
          onClick={handleProceedToPay}
          disabled={!paymentOption}
          style={{
            marginTop: "10px",
            background: paymentOption ? "#4CAF50" : "#ccc",
            color: "white",
            padding: "14px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            width: "80vw",
            marginLeft: "10vw",
          }}
        >
          Proceed to Pay {tp_net} Rs
        </button>
      </div>
    </>
  );
}

export default Receipt;
