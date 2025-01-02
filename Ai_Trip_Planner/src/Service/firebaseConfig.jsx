import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK4crmS3apFzB_GSEprssjTW3Y8iOWq30",
  authDomain: "ai-trip-planner-3d674.firebaseapp.com",
  projectId: "ai-trip-planner-3d674",
  storageBucket: "ai-trip-planner-3d674.firebasestorage.app",
  messagingSenderId: "1012526179016",
  appId: "1:1012526179016:web:0c962b33cb6642730f3bfd",
  measurementId: "G-K7WBQGSG5J",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
