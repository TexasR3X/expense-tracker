"use client";
import { createContext } from "react";
import { GoalGroup, TxnCollection } from "@/util/database";
import useDBData from "@/hooks/useDBData";

export const DBCollectionsContext = createContext(null);

export default function DBCollectionsProvider({ children }) {
    const goalGroup = useDBData("goals", GoalGroup, "NONE");
    const txnCollection = useDBData("transactions", TxnCollection, goalGroup);

    return <DBCollectionsContext.Provider value={txnCollection}>{children}</DBCollectionsContext.Provider>;
}