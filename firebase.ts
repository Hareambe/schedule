import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKW5twJKRHyFWf5LEE3lEn1XxTkE6K5Uk",
    authDomain: "schedule-8fff8.firebaseapp.com",
    projectId: "schedule-8fff8",
    storageBucket: "schedule-8fff8.firebasestorage.app",
    messagingSenderId: "955699294398",
    appId: "1:955699294398:web:91e5677df019ad801faeef",
    measurementId: "G-7X6VTXV4KK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
