// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "",
    authDomain: "schoolaio.firebaseapp.com",
    projectId: "schoolaio",
    storageBucket: "schoolaio.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// email&pw sign in
export const auth = getAuth(app)
// sign in with google
export const googleProvider = new GoogleAuthProvider();
// access firestore
export const db = getFirestore(app);
