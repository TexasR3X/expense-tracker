"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { initializeFirebase } from "@/services/firebase";
import { getAuth } from "firebase/auth";
import { GoalGroup, TxnCollection } from "@/util/database";
import { FirebaseAuthContext } from "./FirebaseAuthContext";
import useDBData from "@/hooks/useDBData";

export const DBCollectionsContext = createContext(null);

export default function DBCollectionsProvider({ children }) {
    const goalGroup = useDBData("goals", GoalGroup);
    console.log("DB goalGroup:", goalGroup);

    const txnCollection = useDBData("transactions", TxnCollection, goalGroup);

    console.log("DB txnCollection:", txnCollection);

    // useEffect(() => {
    //     if (!!txnCollection && !!goalGroup) {
    //         txnCollection.addGoalsToTxnGroups(goalGroup);

    //         console.log("txnCollection:", txnCollection);

    //         // txnCollection.forEach((txnGroup, i) => {
    //         //     console.log("f txnGroup.type:", txnGroup.type);
    //         //     console.log("f txnGroup.goal:", txnGroup.goal);
    //         //     console.log("i:", i);
    //         // });
    //     }
    // }, [txnCollection, goalGroup]);

    return <DBCollectionsContext.Provider value={txnCollection}>{children}</DBCollectionsContext.Provider>;
}