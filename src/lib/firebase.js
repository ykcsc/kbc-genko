import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbcXOhaA73-M_T4y4o5I28WC3KR59DVyk",
  authDomain: "kbc-genko.firebaseapp.com",
  projectId: "kbc-genko",
  storageBucket: "kbc-genko.firebasestorage.app",
  messagingSenderId: "516862254874",
  appId: "1:516862254874:web:fcb76e86d74b389cd496a3",
  measurementId: "G-5QV723GVP4"
};

let db = null;
let auth = null;
let analytics = null;
let isFirebaseEnabled = false;
let firebaseInitError = null;

try {
  if (firebaseConfig.apiKey) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    analytics = getAnalytics(app);
    isFirebaseEnabled = true;
    console.log("Firebase initialized successfully");
  }
} catch (e) {
  console.error("Firebase Init Error:", e);
  firebaseInitError = e.message;
}

// 他のファイルから使えるようにエクスポート
export { db, auth, analytics, isFirebaseEnabled, firebaseInitError };