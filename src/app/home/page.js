"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, where, Timestamp } from "firebase/firestore";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import { Txn, TXN_TYPES, TxnCollection, fetchCollection, TxnGroup, GoalGroup, db } from "@/services/database";
import TxnCard from "@/components/TxnCard";
import { createRandomID } from "@/services/createRandomID";
import useDBData from "@/hooks/useDBData";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    // const [txnCollection, setTxnCollection] = useState(null);
    // const [goals, setGoals] = useState(null);

    const txnCollection = useDBData(user, "transactions", TxnGroup);
    const goalCollection = useDBData(user, "goals", GoalGroup);

    // const fetchTxnCollection = async () => {
    //     const response = await fetchCollection(user, "transactions");
    //     setTxnCollection(new TxnGroup(response));
    // }
    // const fetchGoalsCollection = async () => {
    //     const response = await fetchCollection(user, "goals");
    //     setGoals(new GoalGroup(response));
    // }

    // useEffect(() => {
    //     fetchTxnCollection();
    //     fetchGoalsCollection();
    // }, []);

    const testFn = async () => {
        try {
            console.log("Test ===================================================");
            // console.log("txnCollection:", txnCollection);
            // console.log("goalCollection:", goalCollection);

            // await setDoc(doc(db, "transactions", "345678765435678987654"), {
            //     amount: 6,
            //     name: "Cookies4.5",
            //     type: "Food",
            //     uid: "9OJmF91TaohlA6a4Dd4abBnpqf12",
            // });

            // const w = new Txn({
            //     name: "More Cookies",
            //     type: "Food",
            //     amount: 7,
            //     date: new Timestamp(2, 5),
            // });

            // console.log("w:", w);
            // w.pushToDB(user);

            console.log("Did it! ===================================================");
        }
        catch (e) {
            console.error("e:", e);
        }
    }

    const renderTxnCards = () => {
        const txnCardsArr = [];
        
        TXN_TYPES.forEach((type) => {
            const filteredTxns = txnCollection.filter((txn) => txn.type === type);

            if (!!filteredTxns.length) txnCardsArr.push(
                <TxnCard
                    type={type}
                    key={createRandomID()}
                    txns={filteredTxns}
                    goal={goalCollection.getGoal(type)}
                />
            );
        });

        return txnCardsArr;
    }

    console.log("txnCollection:", txnCollection);
    console.log("goalCollection:", goalCollection);

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