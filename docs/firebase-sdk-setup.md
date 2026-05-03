// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "gtfu-now.firebaseapp.com",
  projectId: "gtfu-now",
  storageBucket: "gtfu-now.firebasestorage.app",
  messagingSenderId: "1043871133643",
  appId: "1:1043871133643:web:e140752a000035055b904e",
  measurementId: "G-PVB5F811ZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);