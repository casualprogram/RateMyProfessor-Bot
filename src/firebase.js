// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCTVnpRZASsDQX3XHG9229hOrsueUy2nbI",
    authDomain: "schoolaio.firebaseapp.com",
    projectId: "schoolaio",
    storageBucket: "schoolaio.appspot.com",
    messagingSenderId: "789421022967",
    appId: "1:789421022967:web:a6235b27f02e23f129fdf2",
    measurementId: "G-9MRZQ8C35Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// email&pw sign in
export const auth = getAuth(app)
// sign in with google
export const googleProvider = new GoogleAuthProvider();
// access firestore
export const db = getFirestore(app);