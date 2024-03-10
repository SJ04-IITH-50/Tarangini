import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ReceiptIcon from '@mui/icons-material/Receipt';

const styles = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    maxWidth: '100vw',
    zIndex: 1000, // Adjust z-index as needed
    backgroundColor: 'inherit', // Change the background color here
    borderTop: '1px solid #ccc', // Add a line above the navigation bar
  },
  icon: {
    color: 'white' // Change the color of icons to white
  }
};

export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState('recents');
    const navigate = useNavigate();
    // const location = useLocation();
    // console.log("printing userdata")
    // console.log(userData);

    // Extract user data from location state

    // const userData_1 = location.state && location.state.user ? JSON.parse(location.state.user) : null;
  
    // const [user, setUser] = useState(userData_1 || userData);
  

    // Update user state when userData prop changes
    // useEffect(() => {
    //   setUser(userData);
    // }, [userData]);

    const location = useLocation();

  // Extract user data from location state
  const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;

  const [user, setUser] = useState(userData);
  const [showLogout, setShowLogout] = useState(false);

  // Update user state when userData prop changes
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  console.log(userData)


    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Navigate to different pages based on the selected value
        switch (newValue) {
            case 'recents':
                // console.log(user);
                // console.log(userData);
                navigate("/home", { state: { user: JSON.stringify(userData) } });
                // navigate("/home", { state: { user: n } });
                break;
            case 'favorites':
                // navigate('/graph');
                navigate("/graph", { state: { user: JSON.stringify(userData) } });

                break;
            case 'nearby':
                navigate('/receipt');
                break;
            case 'folder':
                navigate('/account');
                break;
            default:
                break;
        }
    };

    return (
        <React.Fragment>
            <BottomNavigation sx={styles.bottomNav} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Home"
                    value="recents"
                    icon={<HomeIcon sx={styles.icon} />} // Apply the style to each icon
                />
                <BottomNavigationAction
                    label="Graph"
                    value="favorites"
                    icon={<EqualizerIcon sx={styles.icon} />} // Apply the style to each icon
                />
                <BottomNavigationAction
                    label="Receipt"
                    value="nearby"
                    icon={<ReceiptIcon sx={styles.icon} />} // Apply the style to each icon
                />
                <BottomNavigationAction 
                    label="Account" 
                    value="folder" 
                    icon={<AccountCircleIcon sx={styles.icon} />} // Apply the style to each icon
                />
            </BottomNavigation>
        </React.Fragment>
    );
}