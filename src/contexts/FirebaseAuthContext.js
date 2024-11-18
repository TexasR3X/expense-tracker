"use client";
import { initializeFirebase } from "@/services/firebase";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const FirebaseAuthContext = createContext(null);

export default function FirebaseAuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        //
        initializeFirebase();

        // This gets the authentication object that will allow the user to be logged in.
        const auth = getAuth();

        // auth.onAuthStateChanged basically creates an event listener for when the user changes.
            // unsub = unsubscribe
            // auth.onAuthStateChanged also returns a function (unsub). When unsub is called, it will "unsubscribe" the
            // websock connecting Firestore to the browser. This means basically means it will kill the event listener.
        const unsub = auth.onAuthStateChanged((user) => {
            console.log("User state changed:", user);
            setUser(user);
        }, []);

        // Calling this function will delete the auth.onAuthStateChanged event listener.
        return unsub;
    });

    return <FirebaseAuthContext.Provider value={user}>{children}</FirebaseAuthContext.Provider>;
}