"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, where, query, getFirestore } from "firebase/firestore";
import { initializeFirebase } from "./firebase";

initializeFirebase();
export const db = getFirestore();

export const EXP_TYPES = {
    FOOD: "food",
    HOUSING: "housing",
    // ......... //
}

export class Exp {
    constructor(expData) {
        this.name = expData.name;
        this.type = expData.type;
        this.amount = expData.amount;
        this.timestamp = expData.timestamp;


        // (async () => {
        //     [this.expRef, this.expData] = await getExpData(expID, user);
        //     this.txns = await getTxns(this.expRef);
        // })();
    }
}

// export const getExpsSnap = async (user) => {
//     const expsQueryRef = query(collection(db, "expenses"), where("UID", "==", user.uid));
//     const expsQuerySnap = await getDocs(expsQueryRef);
    
//     const expDataArr = [];

//     expsQuerySnap.forEach((doc) => {
//         console.log("doc.data():", doc.data());
//         expDataArr.push(new Exp(doc.data()))
//     });

//     console.log("expDataArr:", expDataArr);
//     return expDataArr;
// }

class ExpCollection {
    constructor() {

    }
}
export const expCollection = new ExpCollection();

// const getTxns = async (expRef) => {
//     const txnsRef = collection(expRef, "txns");
//     const txnsSnap = await getDocs(txnsRef);

//     const txnsObj = {};

//     txnsSnap.forEach((doc) => {
//         txnsObj[doc.id] = { ...doc.data() };
//     });

//     return txnsObj;
// }
// const getExpData = async (expID, user) => {
//     console.log("database.js: user:", user);

//     const uid = user?.uid;
//     if (!uid) throw new Error(`Invalid type for user\n\tuser = ${user}\n`);

//     const expRef = doc(db, expID, uid);
//     const expSnap = await getDoc(expRef);

//     // console.log("expSnap:", expSnap);

//     // console.log("D:", (await getDoc(doc(docRef, "txns", "KO8xUus8DV7SA8gYwYjm"))).data());
//     // getTxnsFromExp(collection(docRef, "txns"));
    
//     if (expSnap.exists()) return [expRef, expSnap.data()];
//     else {
//         console.error("expSnap.exists() === false")
//         return null;
//     }
// }