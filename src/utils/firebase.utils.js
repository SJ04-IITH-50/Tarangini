import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcJTPf2FTaVUDCgwtbDAmGq4DhrnMpqu4",
  authDomain: "tarangini2-0.firebaseapp.com",
  projectId: "tarangini2-0",
  storageBucket: "tarangini2-0.appspot.com",
  messagingSenderId: "81501909590",
  appId: "1:81501909590:web:19cfcde7163467fdb981f7",
  measurementId: "G-R9MCY561CH"
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
