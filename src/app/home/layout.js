"use client";
import { useContext } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import Nav from "@/components/Nav";
import { GoalGroup, TxnCollection } from "@/services/database";
import useDBData from "@/hooks/useDBData";
import { DBCollectionsContext } from "@/contexts/DBCollectionsContext";

export default function Layout({ children }) {
    const user = useContext(FirebaseAuthContext);
    const { txnCollection, goalGroup } = useContext(DBCollectionsContext);

    // const txnCollection = useDBData(user, "transactions", TxnCollection);
    // const goalGroup = useDBData(user, "goals", GoalGroup);

    return (
        <div>
            <Nav/>
            {!user || !txnCollection || !goalGroup ? <h2>Loading...</h2> : <main>{children}</main>}
        </div>
    );
}