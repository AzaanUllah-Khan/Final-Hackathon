import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, query, where, getDocs,collection, addDoc, onSnapshot,updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXzb1XPXTG8aqKbRCZiXKmsjFO50L-w-w",
  authDomain: "hackathon-3e366.firebaseapp.com",
  projectId: "hackathon-3e366",
  storageBucket: "hackathon-3e366.appspot.com",
  messagingSenderId: "16015550807",
  appId: "1:16015550807:web:5e5fb3b36cfa9577dab612",
  measurementId: "G-DY491QGQ9S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage();
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth,updateDoc, auth, doc, setDoc, db, signOut, getStorage, ref, uploadBytes, storage, collection, query, where, getDocs, onAuthStateChanged, getDownloadURL,addDoc, onSnapshot }