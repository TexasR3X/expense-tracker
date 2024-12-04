"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import ExpCard from "@/components/ExpCard";
import { db, Exp, ExpCollection, getExpCollection } from "@/services/database";




export default function Home() {
    const user = useContext(FirebaseAuthContext);
    const [expCollection, setExpCollection] = useState(null);
    
    const fetchCollection = async () => {
        const response = await getExpCollection(user)
        setExpCollection(new ExpCollection(response));
    }

    useEffect(() => {
        fetchCollection();
    }, []);


    // const expCollection = useMemo(() => {
    //     let returnValue;
    //     console.log("1");

    //     // if (!!user) (async () => {
    //     //     returnValue = new ExpCollection(await getExpCollection(user));
    //     //     console.log("2");
    //     // })();
        
    //     console.log("3");
    //     return returnValue;
    // }, [user]);

    const testFn = async () => {
        try {
            console.log("expCollection:", expCollection);
        }
        catch (e) {
            console.error("e:", e);
        }
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

            {
                
            }

            {/* <ExpCard
                heading="ExpCard Heading"
                // exp={new Exp("food", user)}
            /> */}
        </div>
    );
}