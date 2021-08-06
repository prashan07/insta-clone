import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4JDFyYOiGHB0U-ppcPEiUxk4O2EjwgOc",
  authDomain: "insta-clone-07.firebaseapp.com",
  projectId: "insta-clone-07",
  storageBucket: "insta-clone-07.appspot.com",
  messagingSenderId: "1040474476800",
  appId: "1:1040474476800:web:8de1dcf57029f77a3da3e5",
  measurementId: "G-H12LPB2EGZ"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
