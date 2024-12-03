
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBdK3zVXaVFyEOBzXsP976B2gxzcGk8V2I",
  authDomain: "twygo-d8e9f.firebaseapp.com",
  projectId: "twygo-d8e9f",
  storageBucket: "twygo-d8e9f.firebasestorage.app",
  messagingSenderId: "514340736743",
  appId: "1:514340736743:web:981de59f0d970faa3ddc42"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
