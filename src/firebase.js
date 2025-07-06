// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 追加
// 必要なら getFirestore, getStorage も後で追加可能
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiGsXzco6IL-o_AFj6nDcndUOSwZ9A9kk",
  authDomain: "my-study-site-85328.firebaseapp.com",
  projectId: "my-study-site-85328",
  storageBucket: "my-study-site-85328.firebasestorage.app",
  messagingSenderId: "492800130374",
  appId: "1:492800130374:web:913d64f9ebcfb9c1897947",
  measurementId: "G-MM2PBQCN2L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // これがログイン認証に使われます

export { auth };
export const db = getFirestore(app);
