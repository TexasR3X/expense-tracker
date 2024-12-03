"use client";
import { useContext, useEffect } from "react";
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import ExpCard from "@/components/ExpCard";
import { Exp, getExpData, getTxnsFromExp } from "@/services/database";

export default function Home() {
    const user = useContext(FirebaseAuthContext);

    const testFn = async () => {
        try {
            // const w = new Exp("food", user);

            // console.log("w:", w);

            // await w.forEachTxn();
        }
        catch (e) {
            console.error("e:", e);
        }
    }

    return (
        <div>
            <h1>Expense Tracker</h1>

            <p>
                Welcome to the page where you track all of your expenses!
            </p>

            <Button
                variant="contained"
                onClick={testFn}
            >
                Test Button
            </Button>

            <ExpCard
                heading="ExpCard Heading"
                exp={new Exp("food", user)}
            />
        </div>
    );
}