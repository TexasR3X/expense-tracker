import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    getAuth,
    // GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
  } from "firebase/auth";

// The app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const initializeFirebase = () => {
    // 
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
};

// Firebase version of above code:
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        console.error("There was an error!");
    }
}

export const signUpWithEmailAndPassword = async (email, password) => {
    try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        console.error("There was an error!");
    }
}

export const logout = async () => {
    const auth = getAuth();
    await auth.signOut();
};