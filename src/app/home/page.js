"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import { TXN_TYPES, TxnGroup, GoalGroup, TxnCollection, } from "@/services/database";
import TxnCard from "@/components/TxnCard";
import createRandomID from "@/services/createRandomID";
import useDBData from "@/hooks/useDBData";
import OverViewCard from "@/components/TxnOverviewCard";

export default function Home() {
    const user = useContext(FirebaseAuthContext);

    const txnCollection = useDBData(user, "transactions", TxnCollection);
    const goalGroup = useDBData(user, "goals", GoalGroup);

    const testFn = async () => {
        try {
            console.log("Test ===================================================");
            // console.log("txnCollection:", txnCollection);
            // console.log("goalGroup:", goalGroup);

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

    console.log("txnCollection:", txnCollection);

    // const txnCards = [];
    // const txnTotals = [];

    // TXN_TYPES.forEach((type) => {
    //     const filteredCollection = txnCollection?.filterByType(type);

    //     txnCards.push(
    //         <TxnCard
    //             type={type}
    //             key={`Txn key for ${type}`}
    //             txns={filteredCollection}
    //             goal={goalGroup?.getGoal(type)}
    //         />
    //     );
    //     txnTotals.push(filteredCollection.total);
    // });

    // console.log("txnCards:", txnCards);
    // console.log("txnTotals:", txnTotals);
    

    /*
    const renderTxnCards = () => {
        const txnCardsArr = [];
        
        TXN_TYPES.forEach((type) => {
            const filteredTxns = txnCollection.filter((txn) => txn.type === type);

            if (!!filteredTxns.length)
            txnCardsArr.push(
                <TxnCard
                    type={type}
                    key={createRandomID()}
                    txns={filteredTxns}
                    goal={goalGroup.getGoal(type)}
                />
            );
        });

        return txnCardsArr;
    }
    */
    const renderTxnCards = () => {}

    console.log("txnCollection:", txnCollection);
    console.log("goalGroup:", goalGroup);

    return (
        <div>
            <p>Welcome to the page where you track all of your expenses!</p>
            
            {/* <Button
                variant="contained"
                onClick={testFn}
            >
                Test
            </Button> */}

            {/* <OverViewCard
                txns={txnCollection}
                goals={goalGroup}
            /> */}

            {/* {!!txnCollection ? renderTxnCards() : null} */}

            {!! txnCollection ? txnCollection.map((txnGroup) => {
                const type = txnGroup.type;

                return !!txnGroup.length ? (
                    <TxnCard
                        type={type}
                        key={`TxnCard key: ${type}`}
                        txns={txnGroup}
                        goal={goalGroup.getGoal(type)}
                    />
                ): null;
            }) : null}

            
        </div>
    );
}