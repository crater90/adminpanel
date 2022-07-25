// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCxPcE-b3rgRPG2sY2VGkcLl_FiJ3cmtc",
  authDomain: "smart-daftar.firebaseapp.com",
  projectId: "smart-daftar",
  storageBucket: "smart-daftar.appspot.com",
  messagingSenderId: "606701618515",
  appId: "1:606701618515:web:fcf9aa772d2f0f39450da6",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };