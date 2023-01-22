import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCC_7cjfdnasStlcChr7os814BUsZQ8-sg",
  authDomain: "whose-inn.firebaseapp.com",
  projectId: "whose-inn",
  storageBucket: "whose-inn.appspot.com",
  messagingSenderId: "659897271079",
  appId: "1:659897271079:web:bb7925c37071871467df02",
  measurementId: "G-W1RPFM3RSC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);

export {db, store}
export const signUp_ = (email: any, password: any) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn_ = (email: any, password: any) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut_ = () => {
  return signOut(auth);
};

export const useAuth = () => {
  const [currentUser_, setCurrentUser_] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser_(user));
    return unsub;
  }, []);
  return currentUser_
};
