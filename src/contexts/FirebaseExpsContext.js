"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { initializeFirebase } from "@/services/firebase";
import { getAuth } from "firebase/auth";
import { db } from "@/services/database";

export const FirebaseExpsContext = createContext(null);

export default function FirebaseExpsProvider({ children }) {
    const [expCollection, setExpCollection] = useState(null);

    useEffect(() => {
        (async () => {
            const expsQueryRef = query(collection(db, "expenses"), where("UID", "==", user.uid));
            const expsQuerySnap = await getDocs(expsQueryRef);
            
            const expsDataArr = [];

            expsQuerySnap.forEach((doc) => {
                console.log("doc.data():", doc.data());
                expsDataArr.push(new Exp(doc.data()));
            });

            console.log("expCollection:", expCollection);
            setExpCollection(expsDataArr);
        })();
    }, [expCollection]);

    useEffect(() => {
        
    });




    // const initializeDB = useMemo(() => {
    //     initializeFirebase();
    //     return getFirestore();
    // });
    // const [db, setDB] = useState(initializeDB);

    // useEffect(() => {
    //     // initializeFirebase();
    //     // const auth = getAuth();

    //     const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    //         console.log("Current data:", doc.data());
    //         // setDB(initializeDB);
    //     });

    //     return unsub;
    // }, []);

    return <FirebaseExpsContext.Provider value={db}>{children}</FirebaseExpsContext.Provider>;
}