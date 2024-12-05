"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import { Txn, TXN_TYPES, TxnCollection, fetchCollection, TxnGroup, GoalGroup } from "@/services/database";
import TxnCard from "@/components/TxnCard";
import { createRandomID } from "@/services/randomIDs";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [txnCollection, setTxnCollection] = useState(null);
    const [goals, setGoals] = useState(null);
    
    // const fetchCollection0 = async () => {
    //     const response = await getTxnCollection(user);
    //     setTxnCollection(response);
    // }
    const fetchTxnCollection = async () => {
        const response = await fetchCollection(user, "transactions");
        setTxnCollection(new TxnGroup(response));
    }
    const fetchGoalsCollection = async () => {
        const response = await fetchCollection(user, "goals");
        setGoals(new GoalGroup(response));
    }

    useEffect(() => {
        fetchTxnCollection();
        fetchGoalsCollection();
    }, []);

    const testFn = async () => {
        try {
            console.log("txnCollection:", txnCollection);
            console.log("goals:", goals);
        }
        catch (e) {
            console.error("e:", e);
        }
    }

    const renderTxnCards = () => {
        const txnCardsArr = [];
        
        TXN_TYPES.forEach((type) => {
            const filteredTxns = txnCollection.filter((txn) => txn.type === type);

            console.log("filteredTxns:", filteredTxns);

            if (!!filteredTxns.length) txnCardsArr.push(
                <TxnCard
                    heading={type}
                    key={createRandomID()}
                    txns={filteredTxns}
                    goal={goals.getGoal(type)}
                />
            );
        });

        return txnCardsArr;
    }

    console.log("txnCollection:", txnCollection);
    console.log("goals:", goals);

    return (
        <div>
            <p>Welcome to the page where you track all of your expenses!</p>
            
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