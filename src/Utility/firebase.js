import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTlblIRH0JbzKkXgnrhcuxeujt1X0QdQs",
  authDomain: "amzon-clone-9c35d.firebaseapp.com",
  projectId: "amzon-clone-9c35d",
  storageBucket: "amzon-clone-9c35d.appspot.com",
  messagingSenderId: "698100210873",
  appId: "1:698100210873:web:79ad329cdcf0bfc9844f68"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = app.firestore()