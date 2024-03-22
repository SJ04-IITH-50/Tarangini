import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Graph.css";
import {
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase.utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // Add LineElement import
  PointElement, // Add PointElement import
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // Register LineElement
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend
);



//To get the data from the BD by email
async function getUserByEmail(email) {
  try {
    const userDocRef = doc(db, "Users", email);

    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const user_data = docSnapshot.data();
      // console.log(user_data.Notification)
      return user_data;
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}


async function getUserByEmail_daily(email) {
  try {
    const userDocRef = doc(db, "Users", email);

    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const user_data = docSnapshot.data();
      console.log(user_data.Daily)
      return user_data.Daily;
    } else {
      console.log("User not found.");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

function Graph() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract user data from location state
  const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;

  const [graphType, setGraphType] = useState('monthly'); // Default to monthly
  const [month_G, setMonth_G] = useState(null);
  const [month_H, setMonth_H] = useState(null);
  let month_H_demo=[0,0,0,0,0,0,0,0,0,0,0,0];
  const [month_sp, setMonth_sp] = useState(null);
  const [daily_G, setDaily_G] = useState(null);
  const [daily_H, setDaily_H] = useState(null);
  let daily_H_demo=[0,0,0,0,0,0,0,0,0,0,0,0];
  const [daily_sp, setDaily_sp] = useState(null);

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  // updateUserByEmail(userData.email)

  useEffect(() => {
    getUserByEmail(userData.email)
      .then(user_data => {
        // Perform calculations
        let month_H_demo = [];
        for (let i = 0; i < 12; i++) {
          month_H_demo[i] = user_data.Month_sp[i] - user_data.Month_G[i];
        }
        let daily_H_demo = [];
        for (let i = 0; i < 31; i++) {
          daily_H_demo[i] = user_data.Daily_sp[i] - user_data.Daily_G[i];
        }
        // Set states
        setMonth_G(user_data.Month_G);
        setMonth_sp(user_data.Month_sp);
        setMonth_H(month_H_demo);
        setDaily_G(user_data.Daily_G);
        setDaily_sp(user_data.Daily_sp);
        setDaily_H(daily_H_demo);
      })
      .catch(error => {
        console.log(error);
      });
}, []); // Empty dependency array for running only once


  // getUserByEmail_daily(userData.email)
  // .then(user_data => {
  //   console.log(user_data);
  //   setDaily(user_data);
  //   console.log(user_data_daily);
  // })
  // .catch(error => {
  //   console.log(error);
  // });

  // const user_data=getUserByEmail(userData.email);
  // console.log(user_data)
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Power from Solar Panels',
  //     },
  //   },
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position:'top',
      },
      title: {
        display: true,
        text: 'Power from Solar Panels',
        color:'White',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Change the color of the x-axis labels
        },
      },
      y: {
        ticks: {
          color: 'white', // Change the color of the y-axis labels
        },
      },
    },
  };
  

  const options_1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Power to the Grid',
        color:'White',
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Change the color of the x-axis labels
        },
      },
      y: {
        ticks: {
          color: 'white', // Change the color of the y-axis labels
        },
      },
    },
  };

  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','Oct','Nov','Dec'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Power Generated',
        data: month_sp,
        backgroundColor: 'white',
        color:'White',
        barThickness: 5, // Change this value to adjust the thickness of bars

      },
      {
        label: 'Power Consumed',
        data: month_H,
        backgroundColor: 'black',
        barThickness: 7, // Change this value to adjust the thickness of bars
        color:'White',
      },
    ],
  };
  const data_1 = {
    labels,
    datasets: [],
  };
  
  if (month_G) {
    data_1.datasets.push({
      type: "line",
      label: 'Power to Grid',
      data: month_G.map((value, index) => ({ x: index, y: value })),
      borderColor: 'white',
      fill: true, // Fill the area under the line
    });
  }
  
  
  

  // const labels_1 = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  
  const data_2 = {
    labels:['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
    datasets: [
      {
        label: 'Power Generated',
        data: daily_sp,
        backgroundColor: 'white',
        color:'White',
      },
      {
        label: 'Power Consumed',
        data: daily_H,
        backgroundColor: 'black',
        color:'White',
      },
    ],
  };
  const data_3 = {
    labels:['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
    datasets: [ ],
  };
  if (daily_G) {
    data_3.datasets.push({
      label: 'Power to Grid',
      data: daily_G.map((value, index) => ({ x: index, y: value })),
      borderColor: 'white', // Specify the line color
    });
  }

  const handleGraphTypeChange = (event) => {
    const selectedGraphType = event.target.value;
    if (selectedGraphType !== graphType) {
      setGraphType(selectedGraphType);
    }
  };


  return (
    <div>
      <div className="switches-container">
        <input
          type="radio"
          id="switchMonthly"
          name="switchPlan"
          value="monthly"
          checked={graphType === 'monthly'}
          onChange={handleGraphTypeChange}
        />
        <input
          type="radio"
          id="switchYearly"
          name="switchPlan"
          value="yearly"
          checked={graphType === 'yearly'}
          onChange={handleGraphTypeChange}
        />
        <label htmlFor="switchMonthly">Monthly</label>
        <label htmlFor="switchYearly">Daily</label>
        <div className="switch-wrapper">
          <div className="switch">
            <div>Monthly</div>
            <div>Daily</div>
          </div>
        </div>
      </div>
      {userData && (
        <div>
          {graphType === 'monthly' && (
            <div>
              <h2 style={{textAlign:"center"}}>Monthly Graph</h2>
              {/* Render your monthly graph using userData */}
              {/* <p>User data: {JSON.stringify(userData)}</p> */}
              <Bar options={options} data={data} />
              <Line options={options_1} data={data_1} style={{marginTop:'40px'}}/>
            </div>
          )}
          {graphType === 'yearly' && (
            <div>
              <h2 style={{textAlign:"center"}}>Yearly Graph</h2>
              {/* Render your yearly graph using userData */}
              {/* <p>User data: {JSON.stringify(userData)}</p> */}
              <Bar options={options} data={data_2} />
              <Line options={options_1} data={data_3} style={{marginTop:'40px'}}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Graph;
