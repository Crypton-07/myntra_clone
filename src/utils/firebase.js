// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBydCPx19sZluQbdSiKDBSYPPx0LQVrDhs",
  authDomain: "myntra-clone-e55d3.firebaseapp.com",
  projectId: "myntra-clone-e55d3",
  storageBucket: "myntra-clone-e55d3.appspot.com",
  messagingSenderId: "489802347296",
  appId: "1:489802347296:web:f44a412d5d50209e5a1d45",
  measurementId: "G-MGFZ85QS7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
