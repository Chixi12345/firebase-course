import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaptGvWk_XoxgJlYfNICi5-jsRKkFOrQQ",
  authDomain: "fir-course-9ea4f.firebaseapp.com",
  projectId: "fir-course-9ea4f",
  storageBucket: "fir-course-9ea4f.appspot.com",
  messagingSenderId: "586032551789",
  appId: "1:586032551789:web:f42689f716f101642aec64",
  measurementId: "G-HXW5CRR816",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
