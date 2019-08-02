// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCz_sJpTPtetNFZThXDZL8GsVL16p-MDvg",
  authDomain: "exam-app-bd820.firebaseapp.com",
  databaseURL: "https://exam-app-bd820.firebaseio.com",
  projectId: "exam-app-bd820",
  storageBucket: "",
  messagingSenderId: "353276454349",
  appId: "1:353276454349:web:a9f7551585778593"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();
