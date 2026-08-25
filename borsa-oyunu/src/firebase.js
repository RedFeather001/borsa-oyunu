import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvsQMTYObrFp43MwV6VOOHi_F-x0i8dYE",
  authDomain: "borsa-oyunu-b8ba7.firebaseapp.com",
  projectId: "borsa-oyunu-b8ba7",
  storageBucket: "borsa-oyunu-b8ba7.firebasestorage.app",
  messagingSenderId: "872689564224",
  appId: "1:872689564224:web:58b91dd6688c39d2607da5",
  measurementId: "G-VNMZJGN5S9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);