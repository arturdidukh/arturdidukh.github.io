import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDsm9isFW8kzrbElUGunO3L7rQaTjB-V0o",
  authDomain: "autosvit-498cb.firebaseapp.com",
  projectId: "autosvit-498cb",
  storageBucket: "autosvit-498cb.firebasestorage.app",
  messagingSenderId: "539915493126",
  appId: "1:539915493126:web:35add1e762f0060c410887"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);