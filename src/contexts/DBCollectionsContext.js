"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { initializeFirebase } from "@/services/firebase";
import { getAuth } from "firebase/auth";
import { GoalGroup, TxnCollection } from "@/services/database";
import { FirebaseAuthContext } from "./FirebaseAuthContext";
import useDBData from "@/hooks/useDBData";

export const DBCollectionsContext = createContext(null);

export default function DBCollectionsProvider({ children }) {
    const txnCollection = useDBData("transactions", TxnCollection);
    const goalGroup = useDBData("goals", GoalGroup);

    return <DBCollectionsContext.Provider value={{ txnCollection, goalGroup }}>{children}</DBCollectionsContext.Provider>;
}