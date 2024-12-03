"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, where, query } from "firebase/firestore";
import { db } from "@/services/firebase";

export class Exp {
    constructor(expID, user, db) {
        (async () => {
            [this.expRef, this.expData] = await getExpData(expID, user, db);
            this.txns = await getTxns(this.expRef);
        })();
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
const getExpData = async (expID, user, db) => {
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


// class Exps {
//     constructor() {

//     }
// }

// class Exp {
//     constructor() {
        
//     }
// }