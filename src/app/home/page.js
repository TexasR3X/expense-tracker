"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button, TextField } from "@mui/material";
import { TXN_TYPES, TxnGroup, GoalGroup, TxnCollection, } from "@/util/database";
import TxnCard from "@/components/TxnCards/TxnCard";
import createRandomID from "@/util/createRandomID";
import useDBData from "@/hooks/useDBData";
import OverViewCard from "@/components/TxnCards/TxnOverviewCard";
import { DBCollectionsContext } from "@/contexts/DBCollectionsContext";

export default function Home() {
    const user = useContext(FirebaseAuthContext);

    const txnCollection = useContext(DBCollectionsContext);

    console.log("H user:", user);
    console.log("H txnCollection:", txnCollection);

    // const txnCollection = useDBData(user, "transactions", TxnCollection);
    // const goalGroup = useDBData(user, "goals", GoalGroup);

    const testFn = async () => {
        try {
            console.log("Test ===================================================");
            // console.log("txnCollection:", txnCollection);

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

    // const renderIfDataPulled = (jsx) => {
        

    //     return !!txnCollection && !!goalGroup ? jsx : null;
    // }

    return (
        <div>
            <br/>

            {/* <TextField
                id="myId"
                type="date"
                label="My Date Picker"
                slotProps={{
                    inputLabel: { shrink: true },  // Force the label to stay above the text field
                }}
            />
            
            <Button
                variant="contained"
                onClick={testFn}
            >
                Test
            </Button> */}

            <OverViewCard
                txnCollection={txnCollection}
            />

            {/* <h3>Transaction</h3> */}

            {txnCollection.map((txnGroup) => {
                const type = txnGroup.type;

                console.log("W txnGroup:", txnGroup);

                // !!txnGroup.length

                return txnGroup.goal.amount !== null ? (
                    <TxnCard
                        type={type}
                        key={`TxnCard key: ${type}`}
                        txns={txnGroup}
                        // goal={txnGroup.goal}
                    />
                ) : null;
            })}
        </div>
    );
}