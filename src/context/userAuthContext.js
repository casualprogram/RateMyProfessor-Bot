// import neccessary function from firebase/react
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,

} from "firebase/auth";
import { auth } from "../firebase";


// hold state and functions related to authentication / createContext() is from react
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  
  const [user, setUser] = useState({});

  // functions from firebase that handle log in/signUp/logOut/googleSignIn
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // set up and render captcha for phone number log in
  function setUpRecaptha(number) {
    
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
  }
  // 
  useEffect(() => {
    // using onAuthStateChanged from firebase to track user's auth status
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContextProvider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
      }}
    >
      {children}
    </userAuthContextProvider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
