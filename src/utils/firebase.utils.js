import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBw0cwsCcKcMb0BsMhhjlG4a0gVU42_ZrM",
  authDomain: "tarangini3-7928f.firebaseapp.com",
  projectId: "tarangini3-7928f",
  storageBucket: "tarangini3-7928f.appspot.com",
  messagingSenderId: "356138316730",
  appId: "1:356138316730:web:f65dc8d2f271ad116ae383",
  measurementId: "G-Y0LWZKG40H"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutUser = () => signOut(auth);
export const db = getFirestore(app);
