"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import { Exp, EXP_TYPES, ExpCollection, getExpCollection } from "@/services/database";
import ExpCard from "@/components/ExpCard";
import { createRandomID } from "@/services/randomIDs";

export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [expCollection, setExpCollection] = useState(null);
    
    const fetchCollection = async () => {
        const response = await getExpCollection(user)
        // setExpCollection(new ExpCollection(response));
        setExpCollection(response);
    }

    useEffect(() => {
        fetchCollection();
    }, []);

    const testFn = async () => {
        try {
            console.log("expCollection:", expCollection);
        }
        catch (e) {
            console.error("e:", e);
        }
    }

    const renderExpCards = () => {
        console.log("");
        console.log("EXP_TYPES:", EXP_TYPES);
        const expCardsArr = [];

        EXP_TYPES.forEach((type) => {
            console.log("type:", type);
            const filteredExps = expCollection.filter((exp) => exp.type === type);
            expCardsArr.push(
                <ExpCard
                    heading={type}
                    key={createRandomID()}
                    exps={filteredExps}
                />
            );
        });
        console.log("");

        return expCardsArr;
    }

    console.log("expCollection:", expCollection);

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

            {!!expCollection ? renderExpCards() : null}
        </div>
    );
}