import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDzsZ6tMXsOws5MusXrQANN9-jaDZ7mkKg",
    authDomain: "react-native-firebase-12.firebaseapp.com",
    databaseURL: "https://react-native-firebase-12.firebaseio.com",
    projectId: "react-native-firebase-12",
    storageBucket: "react-native-firebase-12.appspot.com",
    messagingSenderId: "183209804736",
    appId: "1:183209804736:web:f8306ab79edeed64873e25",
    measurementId: "G-Y6X4YGQ7DP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  const db = firebase.firestore()


  export default {
      firebase,
      db,
  }