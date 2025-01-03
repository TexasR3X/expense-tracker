import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
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
}

// Create database, but set after firebase initialized.
// export let db;
// Initialize Firebase
export const initializeFirebase = () => {
    // 
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    // db = getFirestore(app);
}
// initializeFirebase();

// const auth = getAuth();

// Firebase version of above code:
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);

        return null;
    }
    catch (error) {
        return error.message;
    }
}

export const signUpWithEmailAndPassword = async (email, password) => {
    try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        return null;
    }
    catch (error) {
        return error.message;
    }
}

export const logout = async () => {
    const auth = getAuth();
    await auth.signOut();
}