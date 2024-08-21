// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Z6phaffVmJ7x3Uc9-QIQgWDwlkLv3Xs",
  authDomain: "fir-authemail-8a529.firebaseapp.com",
  projectId: "fir-authemail-8a529",
  storageBucket: "fir-authemail-8a529.appspot.com",
  messagingSenderId: "1069515152679",
  appId: "1:1069515152679:web:276cb735a5a299bd94dd02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}