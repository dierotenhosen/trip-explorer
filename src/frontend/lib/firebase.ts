import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrghraSHug9OH4AR-RkV-2p2Nld9teau0",
    authDomain: "trip-explorer-119a3.firebaseapp.com",
    projectId: "trip-explorer-119a3",
    storageBucket: "trip-explorer-119a3.firebasestorage.app",
    messagingSenderId: "1006093158026",
    appId: "1:1006093158026:web:8babd48d29644e3707cf73"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Function to set auth persistence based on "Remember Me" option
export const setAuthPersistence = async (rememberMe: boolean) => {
  const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
  await setPersistence(auth, persistenceType);
};

export { auth, app }; 
