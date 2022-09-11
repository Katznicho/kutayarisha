import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBak04lPS5vPnHxQAmKXgwPjqO4lb98Vco",
  authDomain: "kutayarisha-fdcfd.firebaseapp.com",
  projectId: "kutayarisha-fdcfd",
  storageBucket: "kutayarisha-fdcfd.appspot.com",
  messagingSenderId: "311613656009",
  appId: "1:311613656009:web:d72824f1a4ac40c0d5b618",
  measurementId: "G-FEL7XQPH6X"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

export const FirebaseContext = React.createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
