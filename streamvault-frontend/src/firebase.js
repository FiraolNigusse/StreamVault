// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCKgiJTsSajysK-XaDLrj7tyWHW_uo05l0",
    authDomain: "streamvault-fa630.firebaseapp.com",
    projectId: "streamvault-fa630",
    storageBucket: "streamvault-fa630.firebasestorage.app",
    messagingSenderId: "1091117018843",
    appId: "1:1091117018843:web:94a4a61f1c59a9117fe6fe",
    measurementId: "G-VSHNG40PPQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
