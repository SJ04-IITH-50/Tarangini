import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyBYKFy7yTp0BM-D2X3dizMfLT4nAvRJA",
  authDomain: "tarangini-da482.firebaseapp.com",
  projectId: "tarangini-da482",
  storageBucket: "tarangini-da482.appspot.com",
  messagingSenderId: "268758791474",
  appId: "1:268758791474:web:ffd35d4f82f4cc2929132b",
  measurementId: "G-JH57Y7Y930"
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
