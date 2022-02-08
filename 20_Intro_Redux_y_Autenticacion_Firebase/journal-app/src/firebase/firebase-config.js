import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDUQgWLFR3R9cY_ssYtz2xettq21hBaOjI",
    authDomain: "journal-app-react-31a82.firebaseapp.com",
    projectId: "journal-app-react-31a82",
    storageBucket: "journal-app-react-31a82.appspot.com",
    messagingSenderId: "503923159005",
    appId: "1:503923159005:web:9da83f2ad716f2e1a09034"
}


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export { db, googleAuthProvider, firebase }