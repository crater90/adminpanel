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
  apiKey: "AIzaSyBIITuNMSqDINJCCrwGbW6AN4VZgPOmyn0",
  authDomain: "admin-daftar.firebaseapp.com",
  projectId: "admin-daftar",
  storageBucket: "admin-daftar.appspot.com",
  messagingSenderId: "767748327169",
  appId: "1:767748327169:web:e55ecd95cd22c63fb4fd00",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp;
const db =  getFirestore();
const storage = getStorage();

export { app, db, storage };