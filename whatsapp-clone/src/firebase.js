
import firebase from 'firebase'; 
const firebaseConfig = {
  apiKey: "AIzaSyB7ThdwC5Kd9XamZWng7BXGNpeHyOgiH1o",
  authDomain: "whats-app-clone-1d8bb.firebaseapp.com",
  databaseURL:"https://whats-app-clone-1d8bb.firebaseio.com", 
  projectId: "whats-app-clone-1d8bb",
  storageBucket: "whats-app-clone-1d8bb.appspot.com",
  messagingSenderId: "656699772462",
  appId: "1:656699772462:web:021d02b61a01906fcc99bf",
  measurementId: "G-ETK51EEVLT"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth , provider};
export default db;