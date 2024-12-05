"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import { Txn, TXN_TYPES, TxnCollection, getTxnCollection } from "@/services/database";
import TxnCard from "@/components/TxnCard";
import { createRandomID } from "@/services/randomIDs";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [txnCollection, setTxnCollection] = useState(null);
    
    const fetchCollection = async () => {
        const response = await getTxnCollection(user)
        // setTxnCollection(new TxnCollection(response));
        setTxnCollection(response);
    }

    useEffect(() => {
        fetchCollection();
    }, []);

    const testFn = async () => {
        try {
            console.log("txnCollection:", txnCollection);
        }
        catch (e) {
            console.error("e:", e);
        }
    }

    const renderTxnCards = () => {
        console.log("");
        console.log("TXN_TYPES:", TXN_TYPES);
        const txnCardsArr = [];

        TXN_TYPES.forEach((type) => {
            console.log("type:", type);
            const filteredTxns = txnCollection.filter((txn) => txn.type === type);
            txnCardsArr.push(
                <TxnCard
                    heading={type}
                    key={createRandomID()}
                    txns={filteredTxns}
                />
            );
        });
        console.log("");

        return txnCardsArr;
    }

    console.log("txnCollection:", txnCollection);

    return (
        <div>
            <p>
                Welcome to the page where you track all of your expenses!
            </p>
            
            <Button
                variant="contained"
                onClick={testFn}
            >
                Test
            </Button>

            {!!txnCollection ? renderTxnCards() : null}
        </div>
    );
}