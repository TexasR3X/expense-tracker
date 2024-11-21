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
        console.log("Logging In!");
        const auth = getAuth();
        console.log("auth:", auth);
        await signInWithEmailAndPassword(auth, email, password);

        return null;
    }
    catch (error) {
        console.error("There was an error in logInWithEmailAndPassword! :)");
        console.log("error =", error);

        return error.message;
    }
}

export const signUpWithEmailAndPassword = async (email, password) => {
    try {
        console.log("Signing Up!");
        const auth = getAuth();
        console.log("auth:", auth);
        await createUserWithEmailAndPassword(auth, email, password);

        return null;
    }
    catch (error) {
        console.error("There was an error in signUpWithEmailAndPassword! :)");
        console.log("error:", error);

        return error.message;
    }
}

export const logout = async () => {
    const auth = getAuth();
    await auth.signOut();
};

export const FIRE_BASE_LOGIN_ERRORS = {
    INVALID_CREDENTIAL: "Firebase: Error (auth/invalid-credential).",
    INVALID_EMAIL: "Firebase: Error (auth/invalid-email).",
    INVALID_PASSWORD: "Firebase: Password should be at least 6 characters (auth/weak-password).",
    EMAIL_ALREADY_IN_USE: "Firebase: Error (auth/email-already-in-use).",
}