"use client";
import { useContext } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import Nav from "@/components/Nav";
import { GoalGroup, TxnCollection } from "@/services/database";
import useDBData from "@/hooks/useDBData";
import { DBCollectionsContext } from "@/contexts/DBCollectionsContext";

export default function Layout({ children }) {
    const user = useContext(FirebaseAuthContext);
    const txnCollection = useContext(DBCollectionsContext);

    // const txnCollection = useDBData(user, "transactions", TxnCollection);
    // const goalGroup = useDBData(user, "goals", GoalGroup);

    console.log("!user || !txnCollection:", !user || !txnCollection);

    return (
        <div>
            <Nav/>
            {!user || !txnCollection ? <h2>Loading...</h2> : <main>{children}</main>}
        </div>
    );
}