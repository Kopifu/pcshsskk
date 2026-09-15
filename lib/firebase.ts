// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging, Messaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOrBpSjt73-X9t-WezjbVVxNqbIp2xWzs",
  authDomain: "pcshsnotify.firebaseapp.com",
  projectId: "pcshsnotify",
  storageBucket: "pcshsnotify.firebasestorage.app",
  messagingSenderId: "576676868881",
  appId: "1:576676868881:web:6f049b543872c36ccc52b0",
  measurementId: "G-WQR2D346FB"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;
export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if  (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};
