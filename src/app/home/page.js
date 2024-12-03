"use client";
import { useContext, useEffect } from "react";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db, user } from "@/services/firebase";
import { Exp, getExpData, getTxnsFromExp } from "@/services/database";
import { Button } from "@mui/material";
import ExpCard from "@/components/ExpCard";

export default function Home() {
    // const user = useContext(FirebaseAuthContext);

    const testFn = async () => {
        try {
            // console.log("db:", db);

            // const citiesRef = collection(db, "cities");


            // const docRef = doc(db, "cities", "SF");
            // const docSnap = await getDoc(docRef);
            // console.log("Data you want:", docSnap.data());
            // console.log("docSnap.id():", docSnap.id());


            // console.log("docSnap:", docSnap);

            // if (docSnap.exists()) {
            //     console.log("Document data:", docSnap.data());
            // }
            // else {
            //     // docSnap.data() will be undefined in this case
            //     console.log("No such document!");
            // }

            // const docRef = await addDoc(collection(db, "test-root-1"), {
            //     first: "Ada",
            //     last: "Lovelace",
            //     born: 1815
            // });
            // console.log("docRef.id:", docRef.id);


            // const querySnapshot = await getDocs(collection(db, "test-root-1"));

            // console.log("querySnapshot:", querySnapshot);
            // querySnapshot.forEach((doc) => {
            //     // console.log(`${doc.id} => ${doc.data()}`);
            //     console.log("doc.id:", doc.id);
            //     for (const data of Object.values(doc.data())) {
            //         console.log("data:", data);
            //     }
            //     console.log("");
            // });

            // const querySnapshot = await getDocs(collection(db, "Users Structure 1"));
            // console.log("querySnapshot:", querySnapshot);
            // querySnapshot.forEach((doc) => {
            //     //console.log(`${doc.id} => ${doc.data()}`);
            //     console.log("");
            //     console.log("doc:", doc);
            //     console.log("doc.id:", doc.id);
            //     console.log("doc.data():", doc.data());
            // });

            // const docRef2 = doc(db, "test-root-1", "WDcljkgyXxmtptcfNDyc");
            // const docSnap = await getDoc(docRef2);

            // console.log("docSnap:", docSnap);
            // console.log("docSnap.exists():", docSnap.exists());
            // console.log("docSnap.data():", docSnap.data());



            // const docRef = doc(db, "food", "9OJmF91TaohlA6a4Dd4abBnpqf12");
            // console.log("docRef:", docRef);
            // const docSnap = await getDoc(docRef);
            // console.log("docSnap.data():", docSnap.data());



            // const querySnapshot = await getDocs(collection(db, "Expenses"));
            // console.log("querySnapshot:", querySnapshot);
            // querySnapshot.forEach((doc) => {
            //     //console.log(`${doc.id} => ${doc.data()}`);
            //     console.log("");
            //     console.log("doc:", doc);
            //     console.log("doc.id:", doc.id);
            //     console.log("doc.data():", doc.data());
            // });

            // console.log("user:", user);
            // console.log(`getExpData("food"):`, await getExpData("food"));

            const w = new Exp("food", user);

            console.log("w:", w);

        } catch (e) {
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

            <ExpCard heading="ExpCard Heading"/>
        </div>
    );
}