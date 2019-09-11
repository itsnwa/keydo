import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyAcB1lz92dz0-3QaVV761-_UWd1I0FzRG8",
    authDomain: "todo-1d077.firebaseapp.com",
    databaseURL: "https://todo-1d077.firebaseio.com",
    projectId: "todo-1d077",
    storageBucket: "todo-1d077.appspot.com",
    messagingSenderId: "182590507839",
    appId: "1:182590507839:web:07a55f7df7bfa9e428a18a"
  })
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
