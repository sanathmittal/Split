
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBNKfemNvAOmgJ2t3B0pm-1s9NXRzJ04A",
  authDomain: "split-59314.firebaseapp.com",
  databaseURL: "https://split-59314-default-rtdb.firebaseio.com",
  projectId: "split-59314",
  storageBucket: "split-59314.appspot.com",
  messagingSenderId: "432532481114",
  appId: "1:432532481114:web:e7d8b491aa621306f52463",
  measurementId: "G-52L2WGCW9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
export {auth,db,storage,database}