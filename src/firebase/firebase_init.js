// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCilUAYQWhTZg8gC9Q5MHlojLVuuBG-G0o",
    authDomain: "mike-smith-aviation.firebaseapp.com",
    projectId: "mike-smith-aviation",
    storageBucket: "mike-smith-aviation.appspot.com",
    messagingSenderId: "757001245578",
    appId: "1:757001245578:web:aad110248e2f220d912e73",
    measurementId: "G-CEXQDM1WN4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
