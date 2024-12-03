"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { initializeFirebase } from "@/services/firebase";
import { getAuth } from "firebase/auth";

export const FirebaseDBContext = createContext(null);

export default function FirebaseDBProvider({ children }) {
    const initializeDB = useMemo(() => {
        initializeFirebase();
        return getFirestore();
    });
    const [db, setDB] = useState(initializeDB);

    useEffect(() => {
        // initializeFirebase();
        const auth = getAuth();

        const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
            console.log("Current data:", doc.data());
        });

        return unsub;
    }, []);

    return <FirebaseDBContext.Provider value={0}>{children}</FirebaseDBContext.Provider>;
}