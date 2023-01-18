import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC_7cjfdnasStlcChr7os814BUsZQ8-sg",
  authDomain: "whose-inn.firebaseapp.com",
  projectId: "whose-inn",
  storageBucket: "whose-inn.appspot.com",
  messagingSenderId: "659897271079",
  appId: "1:659897271079:web:bb7925c37071871467df02",
  measurementId: "G-W1RPFM3RSC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);

export {db, store, auth }