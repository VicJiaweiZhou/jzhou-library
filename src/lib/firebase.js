// src/firebase/init.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyD5wIlxqvCahl_nqOR1THgLuU13l9QHE2M",
  authDomain: "week7-jiawei-96676.firebaseapp.com",
  projectId: "week7-jiawei-96676",
  storageBucket: "week7-jiawei-96676.firebasestorage.app",
  messagingSenderId: "753503056984",
  appId: "1:753503056984:web:b044909b48e1361206462d"
}


const app = initializeApp(firebaseConfig)


const auth = getAuth(app)
const db = getFirestore(app)


export { auth, db }
