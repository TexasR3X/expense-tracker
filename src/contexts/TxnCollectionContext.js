"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { initializeFirebase } from "@/services/firebase";
import { getAuth } from "firebase/auth";
import { db } from "@/services/database";

export const TxnCollectionContext = createContext(null);

export default function TxnCollectionProvider({ children }) {
    const [txnCollection, setTxnCollection] = useState(null);



    // useEffect(() => {
    //     (async () => {
    //         const expsQueryRef = query(collection(db, "expenses"), where("UID", "==", user.uid));
    //         const expsQuerySnap = await getDocs(expsQueryRef);
            
    //         const expsDataArr = [];

    //         expsQuerySnap.forEach((doc) => {
    //             console.log("doc.data():", doc.data());
    //             expsDataArr.push(new Exp(doc.data()));
    //         });

    //         setExpCollection(expsDataArr);
    //     })();
    // }, [expCollection]);

    // useEffect(() => {
        
    // });

    return <FirebaseExpsContext.Provider value={txnCollection}>{children}</FirebaseExpsContext.Provider>;
}