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
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//To get the data from the BD by email
async function getUserByEmail_month(email) {
  try {
    const userDocRef = doc(db, "Users", email);

    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const user_data = docSnapshot.data();
      // console.log(user_data.Notification)
      return user_data.Month;
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
  const [user_data_month, setMonth] = useState(null);
  const [user_data_daily, setDaily] = useState(null);
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
        position: 'top',
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
        data: user_data_month,
        backgroundColor: 'white',
        color:'White',
      },
      {
        label: 'Power Consumed',
        data: user_data_month,
        backgroundColor: 'black',
        color:'White',
      },
    ],
  };
  const data_1 = {
    labels,
    datasets: [
      {
        label: 'Power to Grid',
        data: user_data_month,
        backgroundColor: 'white',
      },
    ],
  };

  const labels_1 = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
  
  const data_2 = {
    labels_1,
    datasets: [
      {
        label: 'Power Generated',
        data: user_data_daily,
        backgroundColor: 'white',
        color:'White',
      },
      {
        label: 'Power Consumed',
        data: user_data_daily,
        backgroundColor: 'black',
        color:'White',
      },
    ],
  };
  const data_3 = {
    labels_1,
    datasets: [
      {
        label: 'Power to Grid',
        data: user_data_daily,
        backgroundColor: 'white',
      },
    ],
  };


  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  getUserByEmail_month(userData.email)
    .then(user_data => {
      // console.log(user_data);
      setMonth(user_data);
      console.log(user_data_month);
    })
    .catch(error => {
      console.log(error);
    });

    getUserByEmail_daily(userData.email)
    .then(user_data => {
      console.log(user_data);
      setDaily(user_data);
      //console.log(user_data_month);
    })
    .catch(error => {
      console.log(error);
    });

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
        <label htmlFor="switchYearly">Yearly</label>
        <div className="switch-wrapper">
          <div className="switch">
            <div>Monthly</div>
            <div>Yearly</div>
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
              <Bar options={options_1} data={data_1} style={{marginTop:'40px'}}/>
            </div>
          )}
          {graphType === 'yearly' && (
            <div>
              <h2>Yearly Graph</h2>
              {/* Render your yearly graph using userData */}
              {/* <p>User data: {JSON.stringify(userData)}</p> */}
              <Bar options={options} data={data_2} />
              <Bar options={options_1} data={data_3} style={{marginTop:'40px'}}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Graph;
