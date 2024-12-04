"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { Button } from "@mui/material";
import ExpCard from "@/components/ExpCard";
import { db, Exp, ExpCollection, getExpCollection } from "@/services/database";

export default function Home() {
    const user = useContext(FirebaseAuthContext);

    // const initialExpArr = useMemo(async () => {
    //     const userExpsQueryRef = query(collection(db, "expenses"), where("UID", "==", user.uid))
    //     const userExpsQuerySnap = await getDocs(userExpsQueryRef);

    //     userExpsQuerySnap.forEach((doc) => {
    //         console.log("doc.data():", doc.data());
    //         console.log("new Exp(doc.data()):", new Exp(doc.data()));
    //         console.log("");
    //     });
    //     return ;
    // });

    // const [expArr, setExpArr] = useState(null);
    // useEffect(() => {
    //     (async () => setExpArr(await getExpsSnap(user)))();
    // }, []);

    /*
    const expCollection = useMemo(() => {
        let returnValue;
        (async () => {
            returnValue = new ExpCollection(await getExpCollection(user));
        })();
        return returnValue;
    }, []);
    */

    // const expCollection = useMemo(() => {
    //     return new ExpCollection(await getExpCollection(user));
    // }, []);
    
    const expCollection = useMemo(() => {
        ()();
    });



    /*
    let expCollection;
    useEffect(() => {
        console.log("run!");
        (async () => {
            console.log("user:", user);
            if (!!user) {
                expCollection = new ExpCollection(await getExpCollection(user));
                console.log("in expCollection:", expCollection);
            }
        })();
    }, [user]);
    */

    const testFn = async () => {
        try {
            // const q = query(collection(db, "cities"), where("capital", "==", true));

            // const querySnapshot = await getDocs(q);
            // querySnapshot.forEach((doc) => {
            //     console.log(doc.id, " => ", doc.data());
            // });

            // const userExpsQueryRef = query(collection(db, "expenses"), where("UID", "==", user.uid))
            // const userExpsQuerySnap = await getDocs(userExpsQueryRef);
            // userExpsQuerySnap.forEach((doc) => {
            //     console.log("doc.data():", doc.data());
            //     console.log("new Exp(doc.data()):", new Exp(doc.data()));
            //     console.log("");
            // });
            // const expCollection = new ExpCollection(await getExpCollection(user));

            console.log("expCollection:", expCollection);
        }
        catch (e) {
            console.error("e:", e);
        }
    }

    console.log("expCollection:", expCollection);

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
                Start
            </Button>

            <ExpCard
                heading="ExpCard Heading"
                // exp={new Exp("food", user)}
            />
        </div>
    );
}