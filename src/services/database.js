"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, where, query, getFirestore } from "firebase/firestore";
import { initializeFirebase } from "./firebase";

initializeFirebase();
export const db = getFirestore();

export const EXP_CATEGORIES = {
    FOOD: "food",
    HOUSING: "housing",
    // ......... //
}

export class Exp {
    constructor(expID, user) {
        (async () => {
            [this.expRef, this.expData] = await getExpData(expID, user);
            this.txns = await getTxns(this.expRef);
        })();
    }

    toJSON() {
        return {
            expRef: this.expRef,
            expDate: this.expDate,
            txns: this.txns,
        }
    }

    async forEachTxn() {
        console.log("this:", this);
        console.log("this.toJSON():", this.toJSON());

        // const collectionRef = collection(this.expRef, "txns");
        // console.log("collectionRef:", collectionRef);

        // const collectionSnap = await getDocs(collectionRef);
        // console.log("collectionSnap:", collectionSnap);


    }
}

const getTxns = async (expRef) => {
    const txnsRef = collection(expRef, "txns");
    const txnsSnap = await getDocs(txnsRef);

    const txnsObj = {};

    txnsSnap.forEach((doc) => {
        txnsObj[doc.id] = { ...doc.data() };
    });

    return txnsObj;
}
const getExpData = async (expID, user) => {
    console.log("database.js: user:", user);

    const uid = user?.uid;
    if (!uid) throw new Error(`Invalid type for user\n\tuser = ${user}\n`);

    const expRef = doc(db, expID, uid);
    const expSnap = await getDoc(expRef);

    // console.log("expSnap:", expSnap);

    // console.log("D:", (await getDoc(doc(docRef, "txns", "KO8xUus8DV7SA8gYwYjm"))).data());
    // getTxnsFromExp(collection(docRef, "txns"));
    
    if (expSnap.exists()) return [expRef, expSnap.data()];
    else {
        console.error("expSnap.exists() === false")
        return null;
    }
}