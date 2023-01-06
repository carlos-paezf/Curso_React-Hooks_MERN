import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCJ7zzq1WUXC9jnNnWMSA3ZaUpdSZlTBT8",
    authDomain: "reactjournalapp-ad144.firebaseapp.com",
    projectId: "reactjournalapp-ad144",
    storageBucket: "reactjournalapp-ad144.appspot.com",
    messagingSenderId: "1051201648564",
    appId: "1:1051201648564:web:ea98d9686cdd5046afa4e1"
}


firebase.initializeApp( firebaseConfig )
const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export { db, googleAuthProvider, firebase }