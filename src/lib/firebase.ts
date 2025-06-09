import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// TODO: Replace this with your actual Firebase configuration from the Firebase Console
// Go to Project Settings > General > Your Apps > Web App (</>)
const firebaseConfig = {
    apiKey: "AIzaSyBeISfmsBUDB8OIsfYiArWfHNxEC3i7F8s",
    authDomain: "swiggy-feature-flag.firebaseapp.com",
    projectId: "swiggy-feature-flag",
    storageBucket: "swiggy-feature-flag.firebasestorage.app",
    messagingSenderId: "741528030011",
    appId: "1:741528030011:web:6e15e6c377008b4bd1451e",
    measurementId: "G-HR2GRS58F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); 