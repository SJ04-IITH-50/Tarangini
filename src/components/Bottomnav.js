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
    backgroundImage: 'linear-gradient(120deg, rgba(7, 7, 9, 1) 16%, rgba(27, 24, 113, 1) 96%)',
    borderTop: '1px solid #ccc', // Add a line above the navigation bar
  },
  icon: {
    color: 'white' // Change the color of icons to white
  }
};

export default function LabelBottomNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null); // Initialize user state as null

    useEffect(() => {
        const userData = location.state && location.state.user ? JSON.parse(location.state.user) : null;
        setUser(userData);
    }, [location.state]);

    useEffect(() => {
        // Determine the initial value based on the current path
        const path = location.pathname;
        let initialValue = 'recents'; // Default value
        if (path === '/graph') {
            initialValue = 'favorites';
        } else if (path === '/receipt') {
            initialValue = 'nearby';
        } else if (path === '/account') {
            initialValue = 'folder';
        }
        setValue(initialValue);
    }, [location.pathname]);

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Navigate to different pages based on the selected value
        switch (newValue) {
            case 'recents':
                navigate("/home", { state: { user: JSON.stringify(user) } });
                break;
            case 'favorites':
                navigate("/graph", { state: { user: JSON.stringify(user) } });
                break;
            case 'nearby':
                navigate("/receipt", { state: { user: JSON.stringify(user) } });
                break;
            case 'folder':
                navigate("/account", { state: { user: JSON.stringify(user) } });
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