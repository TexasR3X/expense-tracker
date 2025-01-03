"use client";
import { useContext } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import Header from "@/components/Header";
import { GoalGroup, TxnCollection } from "@/util/database";
import useDBData from "@/hooks/useDBData";
import { DBCollectionsContext } from "@/contexts/DBCollectionsContext";

export default function Layout({ children }) {
    const user = useContext(FirebaseAuthContext);
    const txnCollection = useContext(DBCollectionsContext);

    return (
        <div>
            <Header/>
            {!user || !txnCollection ? <h2>Loading...</h2> : <main>{children}</main>}
        </div>
    );
}