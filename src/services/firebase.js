import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ SUBSTITUA COM SUAS CHAVES DO FIREBASE ⚠️
const firebaseConfig = {
    apiKey: "AIzaSyAYiO_DX_OIgKsOkShHC-4MNGU1CBDLgSQ",
    authDomain: "financeflowprojeto.firebaseapp.com",
    projectId: "financeflowprojeto",
    storageBucket: "financeflowprojeto.firebasestorage.app",
    messagingSenderId: "325979561022",
    appId: "1:325979561022:web:bff4720c758cabe3c8856f",
    measurementId: "G-P5CY59XT9S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
